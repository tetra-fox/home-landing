import { Status } from "./status";

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


export default Services;