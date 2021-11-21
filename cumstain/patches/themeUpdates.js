import { persist, state } from "@cumcord/pluginData";
import { log } from "@cumcord/utils/logger";
import fetchRepo from "../fetchRepo";
import fetchTheme from "../fetchTheme";
import {
    loadTheme,
    reloadTheme,
    removeTheme,
    unloadTheme,
} from "../themeLoadUtil";

const checkAndApplyUpdates = async () => {
    log("|| CUMSTAIN || Started periodic theme update check");

    const repos = await Promise.all(persist.ghost.repos.map(fetchRepo));
    const repoThemes = repos.flatMap((repo) => repo.themes);

    for (let i = 0; i < persist.ghost.themes.length; i++) {
        const theme = persist.ghost.themes[i];

        const themeInRepo = repoThemes.find((t) => t.id === theme.id);
        if (themeInRepo) {
            persist.ghost.themes[i] = themeInRepo;
        } else {
            const fetchedTheme = await fetchTheme(theme.url).catch(() => {});
            if (fetchedTheme) persist.ghost.themes[i] = fetchedTheme;
        }

        persist.store.themes[i].enabled = theme.enabled;
        if (theme.enabled)
            state.ghost.unpatchCache.get(theme.id)?.(
                persist.ghost.themes[i].CSS
            );

        log(`|| CUMSTAIN || Updated theme ${persist.ghost.themes[i].name}`);
    }

    /* for (const theme of repoThemes) {
        const themeInCache = persist.ghost.themes.find(
            (t) => t.id === theme.id
        );
        if (!themeInCache?.enabled || themeInCache.CSS == theme.CSS) continue;

        reloadTheme(theme);
        log(`|| CUMSTAIN || Updated theme ${theme.name}`);
    } */

    log("|| CUMSTAIN || Completed periodic theme update check");
};

export default () => {
    setTimeout(checkAndApplyUpdates, 10);

    const intervalId = setInterval(checkAndApplyUpdates, 600_000);

    return () => clearInterval(intervalId);
};
