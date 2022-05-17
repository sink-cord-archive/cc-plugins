import { persist } from "@cumcord/pluginData";
import fetchTheme from "../util/fetchTheme";
import { loadTheme, unloadAll } from "../util/themeLoadUtil";

export default () => {
	let cancel = false;

	if (persist.ghost.themes)
		// there are a lot of promises happening here, but no real need to await them
		persist.ghost.themes
			.filter((t) => t.enabled)
			.forEach((t) =>
				fetchTheme(t.url, t.repoUrl).then((ft) => cancel || loadTheme(ft))
			);

	return () => {
		unloadAll();
		cancel = true;
	};
};
