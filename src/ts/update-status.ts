import {Status} from "./status";
import {get} from "svelte/store";
import {services, time} from "./stores";
import * as rm from "typed-rest-client/RestClient";

async function getStatus(): Promise<StatusResponse> {
  const rest: rm.RestClient = new rm.RestClient(
    "home-landing",
    "https://home.tetra.cool"
  );
  const res: rm.IRestResponse<StatusResponse> = await rest.get<StatusResponse>(
    "/status"
  );
  if (res.statusCode !== 200 || !res.result)
    throw new Error("Failed to get status");

  time.set(new Date(res.result.time));

  const serviceStore: Service[] = get(services);

  serviceStore.forEach((service: Service) => {
    const container = res.result?.containers
      .filter(c => serviceStore.map(s => s.id).includes(c.name))
      .find(c => c.name === service.id);
    if (!container) {
      services.setStatus(service.id, Status.Offline);
      return;
    }

    if (container.status === "running") {
      services.setStatus(service.id, Status.Online);
    } else {
      services.setStatus(service.id, Status.Offline);
    }
  });

  return res.result;
}

export async function updateStatus(): Promise<void> {
  const serviceStore: Service[] = get(services);
  serviceStore.forEach((service: Service) => {
    services.setStatus(service.id, Status.Checking);
  });
  await getStatus();
}
