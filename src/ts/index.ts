import "../scss/style.scss";
import App from "../svelte/App.svelte";

const greetings = [
  "welcome home", // English
  "bienvenido a casa", // Spanish
  "willkommen zuhause", // German
  "bienvenue à la maison", // French
  "benvenuto a casa", // Italian
  "welkom thuis", // Dutch
  "maligayang pagbabalik", // Tagalog
  "おかえりなさい", // Japanese
  "欢迎回家", // Chinese (simplified)
  "歡迎回家", // Chinese (traditional)
  "καλώς όρισες σπίτι", // Greek
  "добро пожаловать домой", // Russian
  "ласкаво просимо до дому", // Ukrainian
  "witaj w domu" // Polish
];

export default new App({
  target: document.body,
  props: {
    greeting: greetings[Math.floor(Math.random() * greetings.length)]
  }
});
