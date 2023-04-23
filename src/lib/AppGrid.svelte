<script lang="ts">
  import type { App } from "$lib/stores";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { quadInOut } from "svelte/easing";
  import VanillaTilt from "vanilla-tilt";
  import { Status } from "$lib/status";

  import { Heart, HeartCrack, CircleSlashed, CircleEllipsis, CircleDot } from "lucide-svelte";

  const iconTable = {
    [Status.Online]: CircleDot,
    [Status.Offline]: CircleSlashed,
    [Status.Healthy]: Heart,
    [Status.Unhealthy]: HeartCrack,
    [Status.Checking]: CircleEllipsis
  };

  onMount(() => {
    VanillaTilt.init(Array.prototype.slice.call(document.querySelectorAll(".tilt")), {
      max: 12,
      reverse: true,
      speed: 500,
      transition: false,
      glare: true,
      "max-glare": 0.5
    });
  });

  export let apps: App[];
</script>

<div class="app-grid">
  {#each apps as app, i}
    <a href="https://{app.id}.dtw.tetra.cool">
      <div
        class="app-card tilt"
        data-app-id={app.id}
        in:fly={{ y: 14, easing: quadInOut, duration: 200, delay: i * 20 }}>
        <span class="icon" />
        <span class="caption">{app.name}</span>
        <span class="status {app.status}"
          ><span class="indicator"
            ><svelte:component this={iconTable[app.status]} size="10pt" /></span
          >{app.status}</span>
      </div>
    </a>
  {/each}
</div>

<style lang="scss">
  .app-grid {
    width: 700px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .app-card {
    display: grid;
    gap: 10px;
    justify-content: center;
    align-items: center;

    background: $background--secondary;
    border: 1px solid $borders;
    border-radius: 5px;
    padding: 10px;
    transition: $card-transition;
    filter: drop-shadow(3px 3px 3px $shadow);

    &:hover {
      transform: scale(1.03);
      background: $foreground;
      > .caption {
        color: $background;
      }
      > .icon {
        filter: none;
      }
    }

    &:active {
      transform: scale(0.97);
      box-shadow: inset 0 0 19px 3px $shadow--secondary;
    }

    > .caption {
      margin: auto;
      color: $foreground;
      font-size: 10pt;
      transition: $card-transition;
    }

    > .status {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      font-size: 8pt;

      & > .indicator {
        display: flex;
        animation: glow-pulse 1s alternate infinite;
      }

      &.online,
      &.healthy {
        color: $status--online;
      }

      &.offline {
        color: $status--offline;
        & > .indicator {
          animation: none;
        }
      }

      &.checking,
      &.unhealthy {
        color: $status--checking;
      }
    }

    > .icon {
      width: 50px;
      height: 50px;
      margin: auto;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      filter: grayscale(1) contrast(50%);
      transition: $card-transition;
    }

    &[data-app-id="asf"] > .icon {
      background-image: url("/icons/asf.png");
    }
    &[data-app-id="hass"] > .icon {
      background-image: url("/icons/hass.svg");
    }
    &[data-app-id="bridge"] > .icon {
      background-image: url("/icons/homebridge.svg");
    }
    &[data-app-id="pihole"] > .icon {
      background-image: url("/icons/pihole.svg");
    }
    &[data-app-id="portainer"] > .icon {
      background-image: url("/icons/portainer.svg");
    }
    &[data-app-id="unifi"] > .icon {
      background-image: url("/icons/unifi.svg");
    }
  }

  @keyframes glow-pulse {
    from {
      filter: drop-shadow(0 0 0);
    }
    to {
      filter: drop-shadow(0 0 2px);
    }
  }
</style>
