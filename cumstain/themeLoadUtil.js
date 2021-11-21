import data from "@cumcord/pluginData";
import { injectCSS } from "@cumcord/patcher";

function loadTheme(theme) {
    if (!theme?.id || !theme.CSS)
        throw new Error("theme was missing either id or css.");

    const unpatch = injectCSS(theme.CSS);
    data.state.ghost.unpatchCache.set(theme.id, unpatch);

    const themeCacheIndex = data.persist.ghost.themes.findIndex(
        (t) => t.id === theme.id
    );
    let toPush = { ...theme };
    toPush.enabled = true;
    if (themeCacheIndex === -1) data.persist.store.themes.push(toPush);
    else data.persist.store.themes[themeCacheIndex] = toPush;
}

function unloadTheme(theme) {
    if (!theme?.id) throw new Error("theme was missing id.");

    const unpatch = data.state.ghost.unpatchCache.get(theme.id);

    unpatch?.();
    data.state.ghost.unpatchCache.delete(theme.id);

    const themeCacheIndex = data.persist.ghost.themes.findIndex(
        (t) => t.id === theme.id
    );
    let toPush = { ...theme };
    toPush.enabled = false;
    if (themeCacheIndex === -1) data.persist.store.themes.push(toPush);
    else data.persist.store.themes[themeCacheIndex] = toPush;
}

function removeTheme(theme) {
    try {
        unloadTheme(theme);
    } catch (e) {
        if (e.message !== "theme was not loaded.") throw e;
    }

    data.persist.store.themes = data.persist.ghost.themes.filter(
        (t) => t.id !== theme.id
    );
}

function reloadTheme(theme) {
    const unpatch = data.state.ghost.unpatchCache.get(theme.id);
    unpatch?.(theme.CSS);

    let toPush = { ...theme };
    toPush.enabled = true;
    const themeCacheIndex = data.persist.ghost.themes.findIndex(
        (t) => t.id === theme.id
    );
    if (themeCacheIndex === -1) return;
    else data.persist.store.themes[themeCacheIndex] = toPush;
}

function unloadAll() {
    data.state.ghost.unpatchCache.forEach((unpatch) => unpatch?.());
    data.state.ghost.unpatchCache.clear();
}

export { loadTheme, unloadTheme, reloadTheme, removeTheme, unloadAll };
