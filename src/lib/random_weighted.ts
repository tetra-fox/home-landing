export default function randomWeighted(items: WeightedItem[]) {
  // this is insanely clever: https://stackoverflow.com/a/47095386/2621063
  const weights = items.map(
    (
      (s) => (a) =>
        (s += a.weight)
    )(0)
  );
  const random = Math.random() * weights[weights.length - 1];
  const selection = items.find((_, i) => weights[i] > random);

  if (!selection) return items[0].value; // just in case
  return selection.value;
}
