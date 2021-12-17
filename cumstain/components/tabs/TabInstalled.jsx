import { findByDisplayName } from "@cumcord/modules/webpack";
import { persist } from "@cumcord/pluginData";
import { useNest } from "@cumcord/utils";

const { useState, useReducer } = React;

import { ErrorBoundary } from "@cumcord/ui/components";
import ThemeCard from "../cards/ThemeCard";
import InstallBar from "../InstallBar";
import fuzzy from "../../fuzzy";
import SearchBar from "../SearchBar";
import CompatFilterDropdown from "../CompatFilterDropdown";
import NoThemes from "../splashes/NoThemes";

export default ({goTo}) => {
    useNest(persist /* , false, (type, path) => path?.[0] === "themes" */);

    const [search, setSearch] = useState("");
    let [filterMode, setFilterMode] = useState(0);

    // React really doesn't like re-rendering when themes are deleted, so here we are
    const [, rerender] = useReducer((x) => ~x, 0);

    return (
        <ErrorBoundary>
            <InstallBar />

            <div className="ysink_stain_search_row">
                <SearchBar query={search} onChange={setSearch} />
                <CompatFilterDropdown {...{ filterMode, setFilterMode }} />
            </div>

            {persist.ghost.themes.length === 0 ? (
                <NoThemes goToStore={() => goTo(1)} />
            ) : (
                <div className="ysink_stain_cardcontainer">
                    {fuzzy(persist.ghost.themes, search)
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
