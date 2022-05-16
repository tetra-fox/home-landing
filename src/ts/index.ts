import "../scss/style.scss";
import Index from "../svelte/index.svelte";

import { services } from "./services";

const index = new Index({
    target: document.body,
    props: {
        services
    }
});

export default index;