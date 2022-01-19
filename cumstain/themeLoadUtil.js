import data from "@cumcord/pluginData";
import { injectCSS } from "@cumcord/patcher";

async function loadTheme(theme) {
    if (!theme?.id || !await theme.CSS())
        throw new Error("theme was missing either id or css.");

    const unpatch = injectCSS(await theme.CSS());
    data.state.ghost.unpatchCache.set(theme.id, unpatch);

    const themeCacheIndex = data.persist.ghost.themes.findIndex(
        (t) => t.id === theme.id
    );
    let toPush = { ...theme };
    toPush.enabled = true;
    if (themeCacheIndex === -1) data.persist.ghost.themes.push(toPush);
    else data.persist.ghost.themes[themeCacheIndex] = toPush;

    // trigger set event
    data.persist.store.themes = data.persist.ghost.themes;
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
        (t) => t.id !== theme.id
    );
}

async function reloadTheme(theme) {
    const unpatch = data.state.ghost.unpatchCache.get(theme.id);
    unpatch?.(await theme.CSS());

    let toPush = { ...theme };
    toPush.enabled = true;
    const themeCacheIndex = data.persist.ghost.themes.findIndex(
        (t) => t.id === theme.id
    );
    if (themeCacheIndex === -1) return;
    else data.persist.ghost.themes[themeCacheIndex] = toPush;
    
    // trigger set event
    data.persist.store.themes = data.persist.ghost.themes;
}

function unloadAll() {
    data.state.ghost.unpatchCache.forEach((unpatch) => unpatch?.());
    data.state.ghost.unpatchCache.clear();
}

export { loadTheme, unloadTheme, reloadTheme, removeTheme, unloadAll };
