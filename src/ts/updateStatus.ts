import {Status} from "./status";
import Services from "./services";
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

  Services.forEach((service: Service) => {
    const container = res.result?.containers.filter(c =>
      Services.map(s => s.id).includes(c.name)
    ).find(c => c.name === service.id);
    if (!container) {
      service.status = Status.Offline;
      return;
    }

    if (container.status === "running") {
      service.status = Status.Online;
    } else {
      service.status = Status.Offline;
    }
  });
  return res.result;
}

function updateDom() {
  Services.forEach((service: Service) => {
    const status = document
      .querySelector(`[data-service-id="${service.id}"]`)
      ?.querySelector(".status");
    if (!status) return;
    status.classList.remove("online", "offline", "checking");
    status.innerHTML = service.status;
    status.classList.add(service.status);
  });
}

export async function updateStatus(): Promise<void> {
  Services.forEach(service => (service.status = Status.Checking));
  updateDom();
  await getStatus();
  updateDom();
}
