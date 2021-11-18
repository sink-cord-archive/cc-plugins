import { persist } from "@cumcord/pluginData";
import fetchRepo from "../repoFetcher";
import { loadTheme, unloadAll } from "../themeLoadUtil";

export default async () => {
    const reposToLoad = persist.ghost.repos;
    const repos = await Promise.all(reposToLoad.map(repo => fetchRepo(repo)));

    const toLoad = persist.ghost.themes.filter(t => t.enabled);
    throw new Error("I haven't finished this yet.");

    return unloadAll;
};
