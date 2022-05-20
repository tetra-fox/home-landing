<script lang="ts">
  import {apps} from "../ts/stores";

  const cleanupAnimations = () => {
    Array.from(document.querySelectorAll(".fade-in-up")).forEach(e => {
      e.addEventListener("animationend", () => {
        e.classList.remove("fade-in-up");
      });
    });
  };
</script>

<svelte:window on:load={cleanupAnimations} />

<div id="app-grid">
  {#each $apps as app, i}
    <a href="//{app.id}.home.tetra.cool">
      <div
        class="app-card fade-in-up"
        data-app-id={app.id}
        style="animation-delay: {i * 20}ms;"
      >
        <span class="icon" />
        <span class="caption">{app.name}</span>
        <span class="status {app.status}">{app.status}</span>
      </div>
    </a>
  {/each}
</div>
