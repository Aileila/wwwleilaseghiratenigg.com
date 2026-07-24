/** Config Tailwind du site LSN — remplace le CDN cdn.tailwindcss.com.
 *  Rebuild : npx -y -p tailwindcss@3.4.17 -p @tailwindcss/forms@0.5.9 tailwindcss -c tailwind.config.js -i tailwind-input.css -o assets/css/tailwind.css --minify
 */
module.exports = {
  darkMode: "class",
  content: [
    "./*.html",
    "./projets/*.html",
    "./tools/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#2A2A34",
        "primary-container": "#3333CC",
        "on-primary": "#ffffff",
        "on-primary-container": "#EDE9E3",
        "secondary": "#5f5e5e",
        "secondary-container": "#e5e2e1",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#656464",
        "tertiary": "#393b3a",
        "tertiary-container": "#505251",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#c4c5c3",
        "background": "#fbf9f9",
        "on-background": "#2A2A34",
        "surface": "#fbf9f9",
        "on-surface": "#2A2A34",
        "surface-variant": "#e3e2e2",
        "on-surface-variant": "#2A2A34",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f3f3",
        "surface-container": "#efeded",
        "surface-container-high": "#e9e8e7",
        "surface-container-highest": "#e3e2e2",
        "outline": "#948F8A",
        "outline-variant": "#948F8A",
        "inverse-surface": "#303031",
        "inverse-on-surface": "#f2f0f0",
        "inverse-primary": "#EDE9E3",
        "surface-tint": "#3333CC",
        "surface-dim": "#dbdad9",
        "surface-bright": "#fbf9f9",
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a"
      },
      fontFamily: {
        "display": ["Fraunces", "Georgia", "serif"],
        "headline": ["Fraunces", "Georgia", "serif"],
        "body": ["Instrument Sans", "system-ui", "sans-serif"],
        "label": ["Instrument Sans", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
