export function capitalizeFirstLetter(props: string) {
  return (
    props &&
    props
      .trim()
      .toLowerCase()
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
  );
}
