<script lang="ts">
  import { apps, time, greetings } from "$lib/stores";
  import { Status } from "$lib/status";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import randomWeighted from "$lib/random_weighted";
  import api from "$lib/api";
  import AppGrid from "$lib/AppGrid.svelte";

  const greeting = randomWeighted($greetings);

  const updateStatus = async () => {
    apps.update((apps) => {
      apps.forEach((app) => (app.status = Status.Checking));
      return apps;
    });

    const res = await api.get(get(apps).map((app) => app.id));

    time.set(new Date(res.time));

    apps.update((apps) => {
      apps.forEach((app) => {
        const ctr = res.containers.filter((c) => c.name === app.id)[0];
        if (!ctr) {
          app.status = Status.Offline;
          return;
        }
        app.status = ctr.state === "running" ? Status.Online : Status.Offline;
        app.status = ctr.status.includes("(healthy)") ? Status.Healthy : app.status;
        app.status = ctr.status.includes("(unhealthy)") ? Status.Unhealthy : app.status;
      });
      return apps;
    });
  };

  onMount(async () => {
    updateStatus();
    setInterval(updateStatus, 5000);
  });
</script>

<svelte:head>
  <title>{greeting}</title>
</svelte:head>

<div id="container">
  <span id="header">{greeting}</span>
  <span id="server-time">{$time.toLocaleTimeString("en-US", { hour12: false })} (GMT -0400)</span>
  <AppGrid apps={$apps} />
</div>

<style lang="scss">
  #header {
    color: $foreground;
    font-size: 2em;
    font-weight: bold;
  }

  #container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.67em;
    height: 100vh;
  }

  #container > * {
    margin: 0 auto;
  }

  #server-time {
    font-size: 8pt;
    color: $foreground--secondary;
  }
</style>
