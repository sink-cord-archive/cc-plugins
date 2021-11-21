import { persist } from "@cumcord/pluginData";
import { log } from "@cumcord/utils/logger";
import fetchRepo from "../fetchRepo";
import { loadTheme, removeTheme, unloadTheme } from "../themeLoadUtil";

const checkAndApplyUpdates = async () => {
    log("|| CUMSTAIN || Started periodic theme update check");

    const repos = await Promise.all(persist.ghost.repos.map(fetchRepo));
    const themes = repos.flatMap((repo) => repo.themes);

    for (const theme of themes) {
        const themeInCache = persist.ghost.themes.find(
            (t) => t.id === theme.id
        );
        if (!themeInCache || themeInCache.CSS == theme.CSS) continue;

        removeTheme(themeInCache);
        loadTheme(theme);
        if (!themeInCache.enabled) unloadTheme(theme);
        log(`|| CUMSTAIN || Updated theme ${theme.name}`);
    }

    log("|| CUMSTAIN || Completed periodic theme update check");
};

export default () => {
    setTimeout(checkAndApplyUpdates, 10);

    const intervalId = setInterval(checkAndApplyUpdates, 600_000);

    return () => clearInterval(intervalId);
};
