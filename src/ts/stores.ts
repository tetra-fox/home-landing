import {writable} from "svelte/store";
import {Status} from "./status";

const Services: Service[] = [
  {
    id: "asf",
    name: "ArchiSteamFarm",
    status: Status.Checking
  },
  {
    id: "hass",
    name: "Home Assistant",
    status: Status.Checking
  },
  {
    id: "bridge",
    name: "Homebridge",
    status: Status.Checking
  },
  {
    id: "pihole",
    name: "Pi-Hole",
    status: Status.Checking
  },
  {
    id: "portainer",
    name: "Portainer",
    status: Status.Checking
  },
  {
    id: "unifi",
    name: "Unifi Controller",
    status: Status.Checking
  }
];

function createServices() {
  const {subscribe, set, update} = writable(Services.sort((a, b) => a.name.localeCompare(b.name)));

  return {
    subscribe,
    setStatus: (id: string, status: Status) => {
      update(services => {
        services.filter(service => service.id === id)[0].status = status;
        return services;
      });
    }
  };
}

export const time = writable(new Date(0), () => {
  const interval = setInterval(() => {
    time.update(time => new Date(time.getTime() + 1000));
  }, 1000);

  return function stop() {
    clearInterval(interval);
  };
});

export const services = createServices();
