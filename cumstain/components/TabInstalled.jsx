import { persist } from "@cumcord/pluginData";
import { useNest } from "@cumcord/utils";

const { useState, useEffect } = React;

import { ErrorBoundary } from "@cumcord/ui/components";
import ThemeCard from "./ThemeCard";
import fetchRepo from "../fetchRepo";

const getRepos = () => Promise.all(persist.ghost.repos.map(fetchRepo));

const getThemes = async () =>
    (await getRepos())
        .flatMap((r) => r.themes)
        .filter((t1) => persist.ghost.themes.some((t2) => t1.id === t2.id));

export default () => {
    useNest(persist /* , false, (type, path) => path?.[0] === "themes" */);

    let [themes, setThemes] = useState(undefined);
    useEffect(() => {
        if (!themes) getThemes().then(setThemes);
    });

    return (
        <ErrorBoundary>
            <div className="ysink_stain_cardcontainer">
                {(themes ?? []).map((theme) => (
                    <ThemeCard
                        theme={theme}
                        deleteHook={() => setThemes(undefined)}
                    />
                ))}
            </div>
        </ErrorBoundary>
    );
};
