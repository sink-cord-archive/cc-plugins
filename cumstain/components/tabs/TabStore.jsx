import { persist } from "@cumcord/pluginData";
import { useNest } from "@cumcord/utils";
import fetchRepo from "../../fetchRepo";

const { useState, useEffect, useReducer } = React;

import { ErrorBoundary } from "@cumcord/ui/components";
import ThemeCard from "../cards/ThemeCard";
import SearchBar from "../SearchBar";
import fuzzy from "../../fuzzy";
import CompatFilterDropdown from "../CompatFilterDropdown";
import NoRepos from "../splashes/NoRepos";

const getRepos = () => Promise.all(persist.ghost.repos.map(fetchRepo));

const getThemes = (repos) => repos.flatMap((r) => r.themes);

async function getAll() {
    let repos = await getRepos();
    return { repos, themes: getThemes(repos) };
}

const arrayEquals = (a, b) =>
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);

export default () => {
    useNest(persist /* , false, (type, path) => path?.[0] === "repos" */);

    const [search, setSearch] = useState("");

    const [rawRepos, setRawRepos] = useState([]);

    const [repos, setRepos] = useState(undefined);
    const [themes, setThemes] = useState(undefined);
    const [filterMode, setFilterMode] = useState(0);
    useEffect(() => {
        let update = () =>
            getAll().then(({ repos, themes }) => {
                setRepos(repos);
                setThemes(themes);
            });

        if (!arrayEquals(rawRepos, persist.ghost.repos)) {
            setRawRepos(persist.ghost.repos);
            update();
        }

        if (!repos || !themes) update();
    });

    // it's more sensible to use () => setThemes(undefined) as the deleteHook
    // however that makes all the themes disappear briefly as it refetches unnecessarily
    const [, rerender] = useReducer((x) => ~x, 0);

    return (
        <ErrorBoundary>
            <div className="ysink_stain_search_row">
                <SearchBar query={search} onChange={setSearch} />
                <CompatFilterDropdown {...{ filterMode, setFilterMode }} />
            </div>

            {persist.ghost.repos.length === 0 ? (
                <NoRepos />
            ) : (
                <div className="ysink_stain_cardcontainer">
                    {fuzzy(themes ?? [], search)
                        .filter(
                            (t) =>
                                filterMode === 0 ||
                                (filterMode === 1 && !t.compat) ||
                                (filterMode === 2 && t.compat)
                        )
                        .map((theme) => (
                            <ThemeCard theme={theme} deleteHook={rerender} />
                        ))}
                </div>
            )}
        </ErrorBoundary>
    );
};
