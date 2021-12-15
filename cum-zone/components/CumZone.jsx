import { persist } from "@cumcord/pluginData";
import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
import { useNest } from "@cumcord/utils";
import { getPlugins, combinePluginLists } from "../pluginFetcher.js";
import fuzzySearch from "../fuzzy.js";
const useState = React.useState;
const useEffect = React.useEffect;

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

const arrayEquals = (a, b) =>
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);

export default () => {
    let [search, setSearch] = useState("");
    let [repoPlugins, setRepoPlugins] = useState([]);
    let [repos, setRepos] = useState([]);

    useNest(persist);

    useEffect(() => {
        // if the repos have changed, cause a re-render
        if (!arrayEquals(persist.ghost.repos, repos)) {
            setTimeout(() => {
                setRepos(persist.ghost.repos);
                setRepoPlugins([]);
            });
        }

        if (repoPlugins.length == 0 && persist.ghost.repos.length !== 0) {
            combinePluginLists(persist.ghost.repos).then((plugins) => {
                setRepoPlugins(plugins);
            });
        }
    });

    return (
        <ErrorBoundary>
            <FormSection>
                <div className="ysink_zone_header">
                    <FormTitle tag="h1">Welcome to the Cum Zone</FormTitle>
                    <Button
                        className="ysink_zone_button"
                        onClick={() => showRepoModal()}
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

                {persist.ghost.repos.length == 0 ? (
                    <NoReposSplash store={persist.store} />
                ) : (
                    <div className="ysink_zone_card_container">
                        {fuzzySearch(repoPlugins, search)
                            .reverse()
                            .map((p) => (
                                <PluginCard plugin={p} />
                            ))}
                    </div>
                )}
            </FormSection>
        </ErrorBoundary>
    );
};
