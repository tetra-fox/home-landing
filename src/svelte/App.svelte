<script lang="ts">
  export let services: Service[];
  import {updateStatus} from "../ts/updateStatus";

  window.addEventListener("load", () => {
    updateStatus();
    Array.from(document.querySelectorAll(".fade-in-up")).forEach(e => {
      e.addEventListener("animationend", () => {
        e.classList.remove("fade-in-up");
      });
    });

    setInterval(async () => {
      await updateStatus();
    }, 5000);
  });
</script>

<div id="container">
  <h1 id="header" title="you're here!">home.tetra.cool</h1>
  <div id="app-grid">
    {#each services as service, i}
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
</div>
