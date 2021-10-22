import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
import { useNest } from "@cumcord/utils";
import { getPlugins, combinePluginLists } from "../pluginFetcher.js";
import fuzzySearch from "../fuzzy.js";
const useState = React.useState;

import { ErrorBoundary } from "@cumcord/ui/components";
import Ticker from "./Ticker.jsx";
import PluginCard from "./PluginCard.jsx";
import showRepoModal from "./RepoModal.jsx";
import NoReposSplash from "./NoReposSplash.jsx";
const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
const FormSection = findByDisplayName("FormSection");
const FormDivider = findByDisplayName("FormDivider");
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");
const TextInput = findByDisplayName("TextInput");

const fuzzySearchPlugins = (repos, term) =>
    fuzzySearch(combinePluginLists(repos), ["name", "author"], term);

export default ({ nest }) => {
    let [search, setSearch] = useState("");

    useNest(nest);
    return (
        <ErrorBoundary>
            <FormSection>
                <div className="ysink_zone_header">
                    <FormTitle tag="h1">Welcome to the Cum Zone</FormTitle>
                    <Button
                        className="ysink_zone_button"
                        onClick={() => showRepoModal(nest)}
                    >
                        Manage Repos
                    </Button>
                </div>
                <Ticker />

                <TextInput
                    className="ysink_zone_input  ysink_zone_searchbox"
                    placeholder="Search plugins"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e)}
                />

                <FormDivider className="ysink_zone_divide" />

                {nest.ghost.repos.length == 0 ? (
                    <NoReposSplash store={nest.store} />
                ) : (
                    <div className="ysink_zone_card_container">
                        {fuzzySearchPlugins(nest.ghost.repos, search).map(
                            (p) => (
                                <PluginCard plugin={p} />
                            )
                        )}
                    </div>
                )}
            </FormSection>
        </ErrorBoundary>
    );
};
