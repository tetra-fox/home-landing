declare module "*.svelte";

interface Service {
    id: string;
    name: string;
    status?: import("./src/ts/status").Status;
}
