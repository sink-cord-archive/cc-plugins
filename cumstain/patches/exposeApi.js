import { persist } from "@cumcord/pluginData";
import { nests } from "@cumcord/modules/internal";
import { log, error } from "@cumcord/utils/logger";

import {
	loadTheme,
	reloadTheme,
	removeTheme,
	unloadTheme,
} from "../util/themeLoadUtil";
import fetchTheme from "../util/fetchTheme";

const getTheme = url => persist.ghost.themes.find(t => t.url === url);

const themeIsEnabled = url => {
	const theme = getTheme(url);
	return !!theme?.enabled;
};

// returns a promise
const loadOrReload = theme =>
	themeIsEnabled(theme.url) ? reloadTheme(theme) : loadTheme(theme);

const importTheme = async url => await loadOrReload(await fetchTheme(url));

const remove = url => removeTheme(getTheme(url));

const toggleTheme = async url => {
	if (!getTheme(url)) throw new Error(`Theme with ID ${url} was not installed`);

	themeIsEnabled(url)
		? unloadTheme(getTheme(url))
		: await loadOrReload(getTheme(url));
};

const updateNests = async () => {
	if (!window.cumstain) {
		error("|| CUMSTAIN || API was not found, so nests could not be updated.");
		return;
	}

	for (const k in cumstain.installed.ghost) {
		delete cumstain.installed.ghost[k];
		cumstain.installed.delete(k);
	}

	for (const theme of persist.ghost.themes)
		cumstain.installed.store[theme.url] = {
			enabled: theme.enabled,
			//css: await theme.CSS(),
			manifest: theme,
		};

	for (const [k, v] of Object.entries(cumstain.installed.ghost)) {
		if (v.enabled) cumstain.enabled.store[k] = v;
		else {
			delete cumstain.enabled.ghost[k];
			cumstain.installed.delete(k);
		}
	}
};

export default () => {
	// initial state of cumstain object
	window.cumstain = {
		installed: nests.make({}),
		enabled: nests.make({}),
		importTheme,
		removeTheme: remove,
		toggleTheme,
	};

	// populate installed & enabled nests
	updateNests();

	// register handlers to keep exposed nests up to date, but mirrors, so things cant break cumstain internals
	persist.on(nests.Events.UPDATE, updateNests);
	persist.on(nests.Events.SET, updateNests);
	persist.on(nests.Events.DELETE, updateNests);

	log("|| CUMSTAIN || Initialised window.cumstain API");

	return () => {
		persist.off(nests.Events.UPDATE, updateNests);
		persist.off(nests.Events.SET, updateNests);
		persist.off(nests.Events.DELETE, updateNests);

		window.cumstain = undefined;
		delete window.cumstain;

		log("|| CUMSTAIN || Disposed window.cumstain API");
	};
};
