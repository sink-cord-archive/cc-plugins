import { persist } from "@cumcord/pluginData";
import { injectCSS } from "@cumcord/patcher";

const unpatchCache = new Map();

export async function loadTheme(theme) {
	if (!theme?.url || !(await theme.CSS()))
		throw new Error("theme was missing either id or css.");

	const unpatch = injectCSS(await theme.CSS());
	unpatchCache.set(theme.url, unpatch);

	const themeCacheIndex = persist.ghost.themes.findIndex(
		(t) => t.url === theme.url
	);

	let toPush = { ...theme };
	delete toPush.CSS;
	toPush.enabled = true;

	if (themeCacheIndex === -1) persist.ghost.themes.push(toPush);
	else persist.ghost.themes[themeCacheIndex] = toPush;

	// trigger set event
	persist.store.themes = persist.ghost.themes;
}

export function unloadTheme(theme) {
	if (!theme?.url) throw new Error("theme was missing id.");

	const unpatch = unpatchCache.get(theme.url);

	unpatch?.();
	unpatchCache.delete(theme.url);

	const themeCacheIndex = persist.ghost.themes.findIndex(
		(t) => t.url === theme.url
	);
	let toPush = { ...theme };
	toPush.enabled = false;
	if (themeCacheIndex === -1) persist.ghost.themes.push(toPush);
	else persist.ghost.themes[themeCacheIndex] = toPush;

	// trigger set event
	persist.store.themes = persist.ghost.themes;
}

export function removeTheme(theme) {
	try {
		unloadTheme(theme);
	} catch (e) {
		if (e.message !== "theme was not loaded.") throw e;
	}

	persist.store.themes = persist.ghost.themes.filter(
		(t) => t.url !== theme.url
	);
}

export async function reloadTheme(theme) {
	const unpatch = unpatchCache.get(theme.url);
	unpatch?.(await theme.CSS());

	let toPush = { ...theme };
	toPush.enabled = true;
	const themeCacheIndex = persist.ghost.themes.findIndex(
		(t) => t.url === theme.url
	);
	if (themeCacheIndex === -1) return;
	else persist.ghost.themes[themeCacheIndex] = toPush;

	// trigger set event
	persist.store.themes = persist.ghost.themes;
}

export function unloadAll() {
	unpatchCache.forEach((unpatch) => unpatch?.());
	unpatchCache.clear();
}
