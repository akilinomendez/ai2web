export default function classNameGenerator(...classes: any[]) {
  const c = classes.filter(Boolean).join(" ");
  return c;
}
