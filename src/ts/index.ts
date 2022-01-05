import "../scss/style.scss";
import Index from "../svelte/index.svelte";

import { services, time } from "./statuschecker";

const index = new Index({
    target: document.body,
    props: {
        services: services,
        serverTime: time
    }
});

export default index;