<script>
    export let services;
</script>

<div id="container">
    <h1 id="header">home.tetra.cool</h1>
    {#each services as service}
        <a href="//{service.id}.home.tetra.cool">
            <div class="service-card" data-service-id={service.id}>
                <span class="icon" />
                <span class="caption">{service.name}</span>
            </div>
        </a>
    {/each}
</div>
<!-- <span id="server-time" bind:innerHTML={serverTime}>00:00:00</span> -->
