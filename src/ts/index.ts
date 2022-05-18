import "../scss/style.scss";
import App from "../svelte/App.svelte";

import Services from "./services";

export default new App({
  target: document.body,
  props: {services: Services}
});
