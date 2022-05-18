<script lang="ts">
  import {services} from "../ts/stores";

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
  {#each $services as service, i}
    <a href="//{service.id}.home.tetra.cool">
      <div
        class="service-card fade-in-up"
        data-service-id={service.id}
        style="animation-delay: {i * 20}ms;"
      >
        <span class="icon" />
        <span class="caption">{service.name}</span>
        <span class="status {service.status}">{service.status}</span>
      </div>
    </a>
  {/each}
</div>
