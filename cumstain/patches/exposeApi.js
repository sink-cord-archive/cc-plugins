import { persist } from "@cumcord/pluginData";
import { nests } from "@cumcord/modules/internal";

import {
    loadTheme,
    reloadTheme,
    removeTheme,
    unloadTheme,
} from "../themeLoadUtil";
import fetchTheme from "../fetchTheme";

const getTheme = (id) => persist.ghost.themes.find((t) => t.id === id);

const themeIsEnabled = (id) => {
    const theme = getTheme(id);
    return !!theme?.enabled;
};

const loadOrReload = (theme) =>
    themeIsEnabled(theme.id) ? reloadTheme(theme) : loadTheme(theme);

const importTheme = async (url) => loadOrReload(await fetchTheme(url));

const remove = (id) => removeTheme(getTheme(id));

const toggleTheme = (id) => {
    if (!getTheme(id)) throw new Error(`Theme with ID ${id} was not installed`);

    themeIsEnabled(id) ? unloadTheme(getTheme(id)) : loadOrReload(getTheme(id));
};

const updateNests = () => {
    for (const k in window.cumstain.installed.ghost) {
        window.cumstain.installed.store[k] = undefined;
        delete window.cumstain.installed.store[k];
    }

    for (const theme of persist.ghost.themes)
        window.cumstain.installed.store[theme.id] = {
            enabled: theme.enabled,
            css: theme.CSS,
            manifest: theme,
        };

    for (const [k, v] of Object.entries(window.cumstain.installed.ghost)) {
        if (v.enabled) window.cumstain.enabled.store[k] = v;
        else {
            window.cumstain.enabled.store[k] = undefined;
            delete window.cumstain.enabled.store[k];
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

    return () => {
        persist.off(nests.Events.UPDATE, updateNests);
        persist.off(nests.Events.SET, updateNests);
        persist.off(nests.Events.DELETE, updateNests);

        window.cumstain = undefined;
        delete window.cumstain;
    };
};
