import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
import { ErrorBoundary } from "@cumcord/ui/components";
import { useNest } from "@cumcord/utils";
import getPlugins from "./pluginFetcher.js";
import Ticker from "./CopyPastaTicker.jsx";
import PluginCard from "./PluginCard.jsx";
import showRepoModal from "./RepoModal.jsx";
import NoReposSplash from "./NoReposSplash.jsx";
import fuzzySearch from "./fuzzy.js";

const useState = React.useState;
const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
const FormSection = findByDisplayName("FormSection");
const FormDivider = findByDisplayName("FormDivider");
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");
const TextInput = findByDisplayName("TextInput");

const combinePluginLists = (repos) => {
    let repoPluginLists = repos.map((repo) =>
        getPlugins(repo.url).map((p) => {
            p.repo = repo;
            return p;
        })
    );

    return repoPluginLists.length == 0
        ? []
        : repoPluginLists.reduce((c, n) => c.concat(n));
};

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
