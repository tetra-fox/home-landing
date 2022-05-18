<script lang="ts">
  export let greeting: string;
  import {time} from "../ts/stores";
  import {updateStatus} from "../ts/update-status";
  import AppGrid from "./AppGrid.svelte";

  const initializePolling = () => {
    updateStatus();
    setInterval(async () => {
      await updateStatus();
    }, 5000);
  }
</script>

<svelte:window on:load={initializePolling}/>

<div id="container">
  <span id="header">{greeting}</span>
  <span id="server-time"
    >{$time.toLocaleTimeString("en-us", {hour12: false})} (GMT -0400)</span
  >
  <AppGrid />
</div>
