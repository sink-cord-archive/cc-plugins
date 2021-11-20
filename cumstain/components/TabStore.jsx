import { persist } from "@cumcord/pluginData";
import { useNest } from "@cumcord/utils";
import fetchRepo from "../fetchRepo";

const { useState, useEffect, useReducer } = React;

import { ErrorBoundary } from "@cumcord/ui/components";
import ThemeCard from "./ThemeCard";

const getRepos = () => Promise.all(persist.ghost.repos.map(fetchRepo));

const getThemes = (repos) => repos.flatMap((r) => r.themes);

async function getAll() {
    let repos = await getRepos();
    return { repos, themes: getThemes(repos) };
}

export default () => {
    useNest(persist, false, (type, path) => path?.[0] === "repos");

    let [repos, setRepos] = useState(undefined);
    let [themes, setThemes] = useState(undefined);
    useEffect(() => {
        if (!repos || !themes)
            getAll().then(({ repos, themes }) => {
                setRepos(repos);
                setThemes(themes);
            });
    });

    // it's more sensible to use () => setThemes(undefined) as the deleteHook
    // however that makes all the themes disappear briefly as it refetches unnecessarily
    const [, rerender] = useReducer((x) => ~x, 0);

    return (
        <ErrorBoundary>
            <div className="ysink_stain_cardcontainer">
                {(themes ?? []).map((theme) => (
                    <ThemeCard theme={theme} deleteHook={rerender} />
                ))}
            </div>
        </ErrorBoundary>
    );
};
