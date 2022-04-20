import data from "@cumcord/pluginData";
import { injectCSS } from "@cumcord/patcher";

const unpatchCache = new Map();

async function loadTheme(theme) {
	if (!theme?.url || !(await theme.CSS()))
		throw new Error("theme was missing either id or css.");

	const unpatch = injectCSS(await theme.CSS());
	unpatchCache.set(theme.url, unpatch);

	const themeCacheIndex = data.persist.ghost.themes.findIndex(
		t => t.url === theme.url
	);

	let toPush = { ...theme };
	delete toPush.CSS;
	toPush.enabled = true;

	if (themeCacheIndex === -1) data.persist.ghost.themes.push(toPush);
	else data.persist.ghost.themes[themeCacheIndex] = toPush;

	// trigger set event
	data.persist.store.themes = data.persist.ghost.themes;
}

function unloadTheme(theme) {
	if (!theme?.url) throw new Error("theme was missing id.");

	const unpatch = unpatchCache.get(theme.url);

	unpatch?.();
	unpatchCache.delete(theme.url);

	const themeCacheIndex = data.persist.ghost.themes.findIndex(
		t => t.url === theme.url
	);
	let toPush = { ...theme };
	toPush.enabled = false;
	if (themeCacheIndex === -1) data.persist.ghost.themes.push(toPush);
	else data.persist.ghost.themes[themeCacheIndex] = toPush;

	// trigger set event
	data.persist.store.themes = data.persist.ghost.themes;
}

function removeTheme(theme) {
	try {
		unloadTheme(theme);
	} catch (e) {
		if (e.message !== "theme was not loaded.") throw e;
	}

	data.persist.store.themes = data.persist.ghost.themes.filter(
		t => t.url !== theme.url
	);
}

async function reloadTheme(theme) {
	const unpatch = unpatchCache.get(theme.url);
	unpatch?.(await theme.CSS());

	let toPush = { ...theme };
	toPush.enabled = true;
	const themeCacheIndex = data.persist.ghost.themes.findIndex(
		t => t.url === theme.url
	);
	if (themeCacheIndex === -1) return;
	else data.persist.ghost.themes[themeCacheIndex] = toPush;

	// trigger set event
	data.persist.store.themes = data.persist.ghost.themes;
}

function unloadAll() {
	unpatchCache.forEach(unpatch => unpatch?.());
	unpatchCache.clear();
}

export { loadTheme, unloadTheme, reloadTheme, removeTheme, unloadAll };
