const gradients = [
  // get gradients  colors from https://https://hypercolor.dev
  {
    name: "Mango",
    gradient: "from-green-200 via-green-300 to-blue-500",
  },
  {
    name: "Hyper",
    gradient: "from-pink-500 via-red-500 to-yellow-500",
  },
  {
    name: "Sunny",
    gradient: "from-yellow-400 via-red-500 to-pink-500",
  },
  {
    name: "Oceanic",
    gradient: "from-green-300 via-blue-500 to-purple-600",
  },
  {
    name: "COTTON CANDY",
    gradient: "from-pink-300 via-purple-300 to-indigo-400",
  },
  {
    name: "GOTHAM",
    gradient: "from-gray-700 via-gray-900 to-black",
  },
  {
    name: "SUNSET",
    gradient: "from-indigo-200 via-red-200 to-yellow-100",
  },
  {
    name: "MOJAVE",
    gradient: "from-yellow-100 via-yellow-300 to-yellow-500",
  },
  {
    name: "SEAFOAM",
    gradient: "from-green-200 via-green-300 to-blue-500",
  },
  {
    name: "PUMPKIN",
    gradient: "from-yellow-200 via-yellow-400 to-yellow-700",
  },
  {
    name: "PANDORA",
    graident: "from-green-200 via-green-400 to-purple-700",
  },
  {
    name: "VALENTINE",
    gradient: "from-red-200 to-red-600",
  },
  {
    name: "HAWAII",
    gradient: "from-green-300 via-yellow-300 to-pink-300",
  },
  {
    name: "LAVENDER",
    gradient: "from-indigo-300 to-purple-400",
  },
  {
    name: "WINTERGREEN",
    gradient: "from-green-200 to-green-500",
  },
  {
    name: "HUCKLEBERRY",
    gradient: "from-purple-200 via-purple-400 to-purple-800",
  },
  {
    name: "BLUE STEEL",
    gradient: "from-gray-400 via-gray-600 to-blue-800",
  },
  {
    name: "SPACE",
    gradient: "from-gray-900 to-gray-600",
  },
  {
    name: "MESSENGER",
    gradient: "from-sky-400 to-blue-500",
  },
  {
    name: "SEA",
    gradient: "from-cyan-200 to-cyan-400",
  },
  {
    name: "PAYMENT",
    gradient: "from-sky-400 to-cyan-300",
  },
  {
    name: "VIDEO",
    gradient: "from-red-500 to-red-800",
  },
  {
    name: "PINK NEON",
    gradient: "from-fuchsia-600 to-pink-600",
  },
  {
    name: "PURPLE HAZE",
    gradient: "from-purple-800 via-violet-900 to-purple-800",
  },
  {
    name: "BLUE CORAL",
    gradient: "from-blue-400 to-emerald-400",
  },
  {
    name: "SALEM",
    gradient: "from-gray-900 via-purple-900 to-violet-600",
  },
  {
    name: "SKY SEA",
    gradient: "from-sky-400 to-indigo-900",
  },
  {
    name: "MIDNIGHT",
    gradient: "from-blue-700 via-blue-800 to-gray-900",
  },
  {
    name: "APPLE",
    gradient: "from-green-500 to-green-700",
  },
  {
    name: "LUST",
    graident: "from-rose-700 to-pink-600",
  },
  {
    name: "WITCH",
    gradient: "from-slate-900 via-purple-900 to-slate-900",
  },
  {
    name: "HORIZON",
    gradient: "from-orange-500 to-yellow-300",
  },
  {
    name: "MORNING",
    gradient: "from-rose-400 to-orange-300",
  },
  {
    name: "ORANGE CORAL",
    gradient: "from-orange-400 to-rose-400",
  },
];

const gradientsOrientation = [
  "bg-gradient-to-t",
  "bg-gradient-to-tr",
  "bg-gradient-to-r",
  "bg-gradient-to-br",
  "bg-gradient-to-b",
  "bg-gradient-to-bl",
  "bg-gradient-to-l",
  "bg-gradient-to-tl",
  "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]",
  "bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))]",
  "bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))]",
  "bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))]",
  "bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]",
  "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]",
  "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))]",
  "bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))]",
];

export function RandomGradient() {
  const randomIndex = Math.floor(Math.random() * gradients.length);
  const randomOrientation = Math.floor(
    Math.random() * gradientsOrientation.length
  );
  const g = `${gradientsOrientation[randomOrientation]} ${gradients[randomIndex].gradient}`;

  return g;
}
