import rawThemes from "./themes.json";

const CDN_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/";

const processTheme = (t) => ({
    url: new URL(t + ".min.css", CDN_URL).href,
    name: t
        // format base16/* nicely
        .split("/")
        .map((v, i, a) => (i !== a.length - 1 ? `[${v.toUpperCase()}]` : v))
        .join(" ")
        // format themes nicely
        .split(/[ -]/) // I do love me some [ -]
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join(" "),
});

const includedThemes = rawThemes.map(processTheme);

export default includedThemes;
export { processTheme, includedThemes, CDN_URL };
