// Palette and fonts carried over from your original design (ember/coal = Coach, signal/paper = Developer)
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"], darkMode: "class",
  theme: { extend: {
    colors: { ember: "#E8452C", chalk: "#F2EEE8", coal: "#16130F", paper: "#DDE3E6", ink: "#14202B", signal: "#2B59FF" },
    fontFamily: { sans: ['"Hanken Grotesk"', "system-ui", "sans-serif"], cond: ['"Big Shoulders Display"', '"Arial Narrow"', "Impact", "sans-serif"], serif: ['"Instrument Serif"', "Georgia", "serif"] },
  } },
  plugins: [],
};
