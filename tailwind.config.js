const tailwindColors = require("./node_modules/tailwindcss/colors");
const colorSafeList = [];

delete tailwindColors["lightBlue"];
delete tailwindColors["warmGray"];
delete tailwindColors["trueGray"];
delete tailwindColors["coolGray"];
delete tailwindColors["blueGray"];

for (const colorName in tailwindColors) {
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  const pallette = tailwindColors[colorName];

  if (typeof pallette === "object") {
    shades.forEach((shade) => {
      if (shade in pallette) {
        colorSafeList.push(`text-${colorName}-${shade}`);
        colorSafeList.push(`bg-${colorName}-${shade}`);

        ["hover", "focus", "active"].forEach((p) => {
          colorSafeList.push(`${p}:text-${colorName}-${shade}`);
          colorSafeList.push(`${p}:bg-${colorName}-${shade}`);
        });
      }
    });
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: colorSafeList,
  theme: {
    extend: {
      colors: tailwindColors,
    },
  },
  plugins: [],
};
