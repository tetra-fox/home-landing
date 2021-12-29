const hoverElements = document.querySelectorAll("[data-service-name]");

for (const el of hoverElements as any) {
    el.addEventListener("mouseup", (e: Event) => {
        window.location.href = `${window.location.protocol}//${el.dataset.serviceName}.${window.location.hostname != "localhost" ? window.location.hostname : "home.tetra.cool"}`;
    });
}