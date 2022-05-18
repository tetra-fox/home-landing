import "../scss/style.scss";
import App from "../svelte/App.svelte";

const greetings = [
  {text: "welcome home", weight: 1.0}, // English
  {text: "bienvenido a casa", weight: 1.0}, // Spanish
  {text: "willkommen zuhause", weight: 1.0}, // German
  {text: "bienvenue à la maison", weight: 1.0}, // French
  {text: "benvenuto a casa", weight: 1.0}, // Italian
  {text: "welkom thuis", weight: 1.0}, // Dutch
  {text: "maligayang pagbabalik", weight: 1.0}, // Tagalog
  {text: "おかえりなさい", weight: 1.0}, // Japanese
  {text: "欢迎回家", weight: 1.0}, // Chinese (simplified)
  {text: "歡迎回家", weight: 1.0}, // Chinese (traditional)
  {text: "καλώς όρισες σπίτι", weight: 1.0}, // Greek
  {text: "добро пожаловать домой", weight: 1.0}, // Russian
  {text: "ласкаво просимо до дому", weight: 1.0}, // Ukrainian
  {text: "witaj w domu", weight: 1.0}, // Polish
  {text: "hewwo?? owo;;", weight: 0.5} // Furry uwu
];

function randomGreeting() {
  let weights: number[] = greetings.map(greeting => greeting.weight);
  // this is insanely clever: https://stackoverflow.com/a/47095386/2621063
  weights = weights.map((s => a => s += a)(0));

  const random = Math.random() * weights[weights.length - 1];

  const selection = greetings.find((_, i) => {
    if (weights[i] > random) return true;
    return false;
  });

  if (!selection) return greetings[0].text; // theoretically impossible, but just in case
  return selection.text;
}

export default new App({
  target: document.body,
  props: {greeting: randomGreeting()}
});
