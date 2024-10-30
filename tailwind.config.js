/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Escaneia todos os arquivos HTML e TypeScript na pasta src
  ],
  theme: {
    extend: {
      colors: {
        primary130: "#002a4d",
        primary110: "#00437a",
        primary90: "#005ca9",
        primary70: "#2d8ad8",
        primary50: "#6dbafa",
        primary30: "#a0d2fc",
        primary10: " #e5f1fc",

        secondary130: "#663a00",
        secondary110: "#a65e00",
        secondary90: "#d87b00",
        secondary70: "#f39200",
        secondary50: "#fdb548",
        secondary30: "#ffd392",
        secondary10: " #ffefd6",

        tertiary130: "#03453b",
        tertiary110: "#216e62",
        tertiary90: "#359485",
        tertiary70: "#54bbab",
        tertiary50: "#81d6c8",
        tertiary30: "#b9ebe3",
        tertiary10: " #e4f7f4",

        grayscale130: "#22292e",
        grayscale110: "#404b52",
        grayscale90: "#647a7a",
        grayscale70: "#9eb2b8",
        grayscale50: "#d0e0e3",
        grayscale30: "#ebf1f2",
        grayscale10: " #f7fafa",

        ceu130: "#003c4d",
        ceu110: "#006480",
        ceu90: "#008cb2",
        ceu70: "#00b4e6",
        ceu50: "#2ec8f3",
        ceu30: "#6edbfa",
        ceu10: " #d0f5ff",

        uva130: "#4f213f",
        uva110: "#753c61",
        uva90: "#93537d",
        uva70: "#b26f9b",
        uva50: "#ce97bb",
        uva30: "#eac9de",
        uva10: " #fbeaf3",

        limao130: "#465200",
        limao110: "#6d8000",
        limao90: "#99b103",
        limao70: "#afca0b",
        limao50: "#c5de31",
        limao30: "#def06d",
        limao10: " #f5fec1",

        tangerina130: "#664800",
        tangerina110: "#996c00",
        tangerina90: "#d19400",
        tangerina70: "#f9b000",
        tangerina50: "#fac546",
        tangerina30: "#fcdd92",
        tangerina10: " #fff3d6",

        goiaba130: "#801905",
        goiaba110: "#b23820",
        goiaba90: "#d8583f",
        goiaba70: "#ef765e",
        goiaba50: "#f79481",
        goiaba30: "#fcbdb0",
        goiaba10: " #ffeae5",

        positive130: "#093a14",
        positive110: "#0d581c",
        positive90: "#127527",
        positive70: "#179231",
        positive50: "#5cb26e",
        positive30: "#a2d3ad",
        positive10: " #e7faea",

        attention130: "#661a1a",
        attention110: "#8c2323",
        attention90: "#b22c2c",
        attention70: "#d93636",
        attention50: "#e47272",
        attention30: "#f0afaf",
        attention10: " #fbebeb",

        negative130: "#654c02",
        negative110: "#977203",
        negative90: "#ca9804",
        negative70: "#fcbe05",
        negative50: "#fdd150",
        negative30: "#fee59b",
        negative10: " #fff9e6",

        informative130: "#02414c",
        informative110: "#026173",
        informative90: "#038299",
        informative70: "#04a2bf",
        informative50: "#4fbed2",
        informative30: "#9bdae5",
        informative10: " #e5f6f8",
      }
    },
  },
  plugins: [
    require('daisyui'), // Adiciona DaisyUI como plugin
  ],
  daisyui: {
  },
};
