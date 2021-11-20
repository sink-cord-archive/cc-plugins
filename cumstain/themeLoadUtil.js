import data from "@cumcord/pluginData";
import { injectCSS } from "@cumcord/patcher";

function loadTheme(theme) {
    if (!theme?.id || !theme.CSS)
        throw new Error("theme was missing either id or css.");

    const unpatch = injectCSS(theme.CSS);
    data.state.ghost.unpatchCache.set(theme.id, unpatch);

    data.persist.store.themes = data.persist.ghost.themes.filter(
        (t) => t.id !== theme.id
    );
    data.persist.store.themes.push({ id: theme.id, enabled: true });
}

function unloadTheme(theme) {
    if (!theme?.id) throw new Error("theme was missing id.");

    const unpatch = data.state.ghost.unpatchCache.get(theme.id);
    if (!unpatch) throw new Error("theme was not loaded.");

    unpatch();
    data.state.ghost.unpatchCache.delete(theme.id);

    data.persist.store.themes = data.persist.ghost.themes.filter(
        (t) => t.id !== theme.id
    );
    data.persist.store.themes.push({ id: theme.id, enabled: false });
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

function unloadAll() {
    data.state.ghost.unpatchCache.forEach((unpatch) => unpatch?.());
    data.state.ghost.unpatchCache.clear();
}

export { loadTheme, unloadTheme, removeTheme, unloadAll };
