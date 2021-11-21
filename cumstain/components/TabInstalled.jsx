import { findByDisplayName } from "@cumcord/modules/webpack";
import { persist } from "@cumcord/pluginData";
import { useNest } from "@cumcord/utils";

const { useState, useReducer } = React;

import { ErrorBoundary } from "@cumcord/ui/components";
import ThemeCard from "./ThemeCard";
import InstallBar from "./InstallBar";
import fuzzy from "../fuzzy";
import SearchBar from "./SearchBar";

export default () => {
    useNest(persist /* , false, (type, path) => path?.[0] === "themes" */);

    const [search, setSearch] = useState("");

    // React really doesn't like re-rendering when themes are deleted, so here we are
    const [, rerender] = useReducer((x) => ~x, 0);

    return (
        <ErrorBoundary>
            <InstallBar />

            <SearchBar query={search} onChange={setSearch} />

            <div className="ysink_stain_cardcontainer">
                {fuzzy(persist.ghost.themes, search).map((theme) => (
                    <ThemeCard theme={theme} deleteHook={rerender} />
                ))}
            </div>
        </ErrorBoundary>
    );
};
