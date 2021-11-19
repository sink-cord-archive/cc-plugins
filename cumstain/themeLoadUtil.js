import data from "@cumcord/pluginData";
import { injectCSS } from "@cumcord/patcher";

function loadTheme(theme) {
    if (!theme?.id || !theme.CSS)
        throw new Error("theme was missing either id or css.");

    const unpatch = injectCSS(theme.CSS);
    data.state.ghost.unpatchCache.set(theme.id, unpatch);
}

function unloadTheme(theme) {
    if (!theme?.id) throw new Error("theme was missing id.");

    const unpatch = data.unpatchCache.ghost.get(theme.id);
    if (!unpatch) throw new Error("theme was not loaded.");

    unpatch();
    data.unpatchCache.ghost.delete(theme.id);
}

function unloadAll() {
    data.state.ghost.unpatchCache.forEach((unpatch) => unpatch?.());
    data.state.ghost.unpatchCache.clear();
}

export { loadTheme, unloadTheme, unloadAll };
