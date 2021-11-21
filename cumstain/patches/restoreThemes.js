import { persist } from "@cumcord/pluginData";
import { loadTheme, unloadAll } from "../themeLoadUtil";

export default () => {
    if (persist.ghost.themes)
        persist.ghost.themes.filter((t) => t.enabled).forEach(loadTheme);

    return unloadAll;
};
