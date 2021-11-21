import { persist } from "@cumcord/pluginData";
import fetchRepo from "../fetchRepo";
import { loadTheme, unloadAll } from "../themeLoadUtil";

export default async () => {
    if (!persist.ghost.themes) return unloadAll;

    persist.ghost.themes.filter((t) => t.enabled).forEach(loadTheme);

    return unloadAll;
};
