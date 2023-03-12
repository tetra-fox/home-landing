import { writable, readable, type Readable, type Writable } from "svelte/store";
import { Status } from "$lib/status";
import type { WeightedItem } from "$lib/random_weighted";

export const greetings: Readable<WeightedItem[]> = readable([
  { value: "welcome home", weight: 1.0 }, // English
  { value: "bienvenido a casa", weight: 1.0 }, // Spanish
  { value: "willkommen zuhause", weight: 1.0 }, // German
  { value: "bienvenue à la maison", weight: 1.0 }, // French
  { value: "benvenuto a casa", weight: 1.0 }, // Italian
  { value: "welkom thuis", weight: 1.0 }, // Dutch
  { value: "maligayang pagbabalik", weight: 1.0 }, // Tagalog
  { value: "おかえりなさい", weight: 1.0 }, // Japanese
  { value: "欢迎回家", weight: 1.0 }, // Chinese (simplified)
  { value: "歡迎回家", weight: 1.0 }, // Chinese (traditional)
  { value: "καλώς όρισες σπίτι", weight: 1.0 }, // Greek
  { value: "добро пожаловать домой", weight: 1.0 }, // Russian
  { value: "ласкаво просимо до дому", weight: 1.0 }, // Ukrainian
  { value: "witaj w domu", weight: 1.0 }, // Polish
  { value: "hewwo?? owo;;", weight: 0.5 } // Furry uwu
]);

export type App = {
  id: string;
  name: string;
  status: Status;
};

export const apps: Writable<App[]> = (() => {
  const { subscribe, set, update } = writable<App[]>([
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
  ]);

  const setStatus = (id: string, status: Status) => {
    console.log("polling");

    update((apps) => {
      apps.filter((app) => app.id === id)[0].status = status;
      return apps;
    });
  };

  return {
    subscribe,
    set,
    update,
    setStatus
  };
})();

export const time: Writable<Date> = (() => {
  const { subscribe, set, update } = writable(new Date(0));

  const increment = () => update((time) => new Date(time.getTime() + 1000));

  setInterval(increment, 1000);

  return {
    subscribe,
    set,
    update,
    increment,
    reset: () => {
      set(new Date(0));
    }
  };
})();
