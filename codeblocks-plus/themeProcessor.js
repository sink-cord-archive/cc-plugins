import rawThemes from "./themes.json";

const CDN_URL =
	"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/";

const niceFormatName = raw => {
	const [split1, split2] = raw.split("/");
	const rawName = split2 ?? split1;
	const processedName = rawName
		.split(/[ -]/)
		.map(s => s[0].toUpperCase() + s.slice(1))
		.join(" ");

	return `${processedName} ${split2 ? "[BASE16]" : ""}`;
};

const processTheme = t => ({
	url: new URL(t + ".min.css", CDN_URL).href,
	name: niceFormatName(t),
});

const includedThemes = rawThemes
	.map(processTheme)
	.sort((a, b) => a.name.localeCompare(b.name));

export default includedThemes;
export { processTheme, includedThemes, CDN_URL };
