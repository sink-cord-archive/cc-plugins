import data from "@cumcord/pluginData";
import { injectCSS } from "@cumcord/patcher";

function loadTheme(theme) {
    if (!theme?.id || !theme.CSS)
        throw new Error("theme was missing either id or css.");

    const unpatch = injectCSS(theme.CSS);
    data.unpatchCache.store.set(theme.id, unpatch);
}

function unloadTheme(theme) {
    if (!theme?.id) throw new Error("theme was missing id.");

    const unpatch = data.unpatchCache.ghost.get(theme.id);
    if (!unpatch) throw new Error("theme was not loaded.");

    unpatch();
    data.unpatchCache.ghost.delete(theme.id);
}

function unloadAll() {
    data.unpatchCache.ghost.forEach((unpatch) => unpatch?.());
    data.unpatchCache.ghost.clear();
}

export { loadTheme, unloadTheme, unloadAll };
