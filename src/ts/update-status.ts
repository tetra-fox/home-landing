import {Status} from "./status";
import {get} from "svelte/store";
import {apps, time} from "./stores";
import * as rm from "typed-rest-client/RestClient";

async function getStatus(): Promise<StatusResponse> {
  const rest: rm.RestClient = new rm.RestClient(
    "home-landing",
    "https://home.tetra.cool"
  );

  const res: rm.IRestResponse<StatusResponse> = await rest.get<StatusResponse>(
    "/api"
  );
  if (res.statusCode !== 200 || !res.result)
    throw new Error("Failed to get status");

  time.set(new Date(res.result.time));

  const appStore: App[] = get(apps);

  appStore.forEach((app: App) => {
    const container = res.result?.containers
      .filter(c => appStore.map(s => s.id).includes(c.name))
      .find(c => c.name === app.id);
    if (!container) {
      apps.setStatus(app.id, Status.Offline);
      return;
    }

    if (container.state === "running") {
      apps.setStatus(app.id, Status.Online);
      if (container.status.includes("(healthy)")) apps.setStatus(app.id, Status.Healthy);
      if (container.status.includes("(unhealthy)")) apps.setStatus(app.id, Status.Unhealthy);
    } else {
      apps.setStatus(app.id, Status.Offline);
    }
  });

  return res.result;
}

export async function updateStatus(): Promise<void> {
  const appStore: App[] = get(apps);
  appStore.forEach((app: App) => {
    apps.setStatus(app.id, Status.Checking);
  });
  await getStatus();
}
