import data from "@cumcord/pluginData";
import { injectCSS } from "@cumcord/patcher";

async function loadTheme(theme) {
    if (!theme?.url || !await theme.CSS())
        throw new Error("theme was missing either id or css.");

    const unpatch = injectCSS(await theme.CSS());
    data.state.ghost.unpatchCache.set(theme.url, unpatch);

    const themeCacheIndex = data.persist.ghost.themes.findIndex(
        (t) => t.url === theme.url
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

    const unpatch = data.state.ghost.unpatchCache.get(theme.url);

    unpatch?.();
    data.state.ghost.unpatchCache.delete(theme.url);

    const themeCacheIndex = data.persist.ghost.themes.findIndex(
        (t) => t.url === theme.url
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
        (t) => t.url !== theme.url
    );
}

async function reloadTheme(theme) {
    const unpatch = data.state.ghost.unpatchCache.get(theme.url);
    unpatch?.(await theme.CSS());

    let toPush = { ...theme };
    toPush.enabled = true;
    const themeCacheIndex = data.persist.ghost.themes.findIndex(
        (t) => t.url === theme.url
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
