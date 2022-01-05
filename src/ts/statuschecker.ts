import { Status } from "./status";
import { Docker } from "node-docker-api";
// const docker = new Docker({ socketPath: "/var/run/docker.sock" });
const docker = new Docker({ socketPath: "npipe:////./pipe/docker_engine" });

export let time = 0;

export const services: Service[] = [
    {
        id: "asf",
        name: "ArchiSteamFarm",
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
        id: "traefik",
        name: "Traefik",
        status: Status.Checking
    },
    {
        id: "unifi",
        name: "Unifi Controller",
        status: Status.Checking
    }
];

setInterval(() => {
    services.push({
        id: "asf",
        name: "ArchiSteamFarm",
        status: Status.Checking
    });
    console.log(services);
}, 1000);

setInterval(() => {
    services.forEach((service) => {
        service.status = Status.Offline;
    });
    console.log(services);
}, 2000);

const updateServices = () => {
    docker.container
        .list()
        .then((containers) => containers[0].status())
        .then((container) => {
          
        })
        .catch((error) => console.log(error));
};

const updateTime = () => {
    // eventually this will get the time from the server
    time = +new Date();
};

setInterval(updateTime, 1000);
