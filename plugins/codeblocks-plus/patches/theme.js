import data from "@cumcord/pluginData";
import { injectCSS } from "@cumcord/patcher";
import { log, warn } from "@cumcord/utils/logger";
import { findByProps } from "@cumcord/modules/webpack";
import { CDN_URL } from "../themeProcessor";

const markupClass = findByProps("markup").markup;

const patchBrownPaper = () => {
	let unpatch = injectCSS(
		`.hljs {background: url(${new URL("brown-papersq.png", CDN_URL).href})}`
	);
	let unload = data.unloadTheme;
	data.unloadTheme = () => {
		unpatch();
		unload?.();
	};
};

const loadTheme = async (url) => {
	const css = await (await fetch(url)).text();
	data.unloadTheme?.();
	data.unloadTheme = injectCSS(css);
	if (url.includes("brown-paper")) patchBrownPaper();
	log("|| codeblocks plus || Loaded hljs theme successfully ");
};

const tryLoadFromNest = async () => {
	if (data.persist.ghost.theme) await loadTheme(data.persist.ghost.theme);
	else {
		data.unloadTheme?.();
		warn("|| codeblocks plus || No theme set in nest");
	}
};

export default () => {
	tryLoadFromNest();

	const nestHandler = (_, { path, __ }) => {
		if (path[0] === "theme") tryLoadFromNest();
	};

	data.persist.on("SET", nestHandler);
	data.persist.on("DELETE", nestHandler);

	return () => {
		data.persist.off("SET", nestHandler);
		data.persist.off("DELETE", nestHandler);
		data.unloadTheme?.();
	};
};
