import { persist } from "@cumcord/pluginData";
import fetchRepo from "../fetchRepo";
import { loadTheme, unloadAll } from "../themeLoadUtil";

export default async () => {
    if (!persist.ghost.repos || !persist.ghost.themes) return unloadAll;

    const reposToLoad = persist.ghost.repos;
    const repos = await Promise.all(
        reposToLoad.map(async (repo) => [repo, await fetchRepo(repo)])
    );

    /* const flatThemes = [];
    repos.forEach(([u, r]) => {
        flatThemes.push(...r.themes.map((t) => ({ ...t, repoUrl: u })));
    }); */
    const flatThemes = repos.flatMap(([u, r]) => r.themes.map((t) => ({ ...t, repoUrl: u })));

    const toLoad = persist.ghost.themes.filter((t) => t.enabled);
    flatThemes
        .filter((t1) => toLoad.some((t2) => t1.id === t2.id))
        .forEach(loadTheme);

    return unloadAll;
};
