<script>
    export let services;
    export let serverTime;
</script>
1
<div id="container">
    <h1 id="header">home.tetra.cool</h1>
    {#each services as service}
        <a href="//{service.id}.home.tetra.cool">
            <div class="service-card" data-service-id={service.id}>
                <span class="icon" />
                <span class="caption">{service.name}</span>
                <span contenteditable="true" bind:innerHTML={service.status} class="status" />
            </div>
        </a>
    {/each}
</div>
<!-- <span id="server-time" contenteditable="true" bind:innerHTML={serverTime}>00:00:00</span> -->
