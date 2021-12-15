import { persist } from "@cumcord/pluginData";
import { findByProps, findByDisplayName } from "@cumcord/modules/webpack";
import { useNest } from "@cumcord/utils";
import { showToast } from "@cumcord/ui/toasts";
import getPlugins from "../pluginFetcher.js";
const useState = React.useState;

import RepoCard from "./RepoCard.jsx";
import NoReposSplash from "./NoReposSplash.jsx";
import { ErrorBoundary } from "@cumcord/ui/components";
const ModalComponents = findByProps("ModalCloseButton");
const Header = findByProps("Sizes", "Tags");
const Flex = findByDisplayName("Flex");
const { openModal } = findByProps("openModalLazy");
const FormSection = findByDisplayName("FormSection");
const FormDivider = findByDisplayName("FormDivider");
const TextInput = findByDisplayName("TextInput");
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");

async function verifyRepo(repo) {
    try {
        await getPlugins(repo);
        return true;
    } catch {
        return false;
    }
}

async function addRepo(nest, repo) {
    if (!repo.endsWith("/")) repo += "/";

    if (nest.ghost.repos.find((r) => r.url == repo) !== undefined) {
        showToast({
            title: "You already have this repo!",
            duration: 5000,
        });
    } else if (await verifyRepo(repo)) {
        // copy like this to correctly raise events
        let repos = nest.ghost.repos;
        const split = repo.split("/");
        repos.push({
            url: repo,
            name: split[split.length - 2],
            enabled: true,
        });
        nest.store.repos = repos;
        showToast({
            title: "Added repo",
            duration: 5000,
        });
    } else {
        showToast({
            title: "Repo was invalid",
            duration: 5000,
        });
    }
}

const RepoModalComponent = ({ e }) => {
    const [input, setInput] = useState("");

    useNest(persist);
    return (
        <ErrorBoundary>
            <ModalComponents.ModalRoot
                transitionState={e.transitionState}
                size="large"
                className="ysink_zone_modal"
            >
                <ModalComponents.ModalHeader separator={false}>
                    <Flex.Child basis="auto" grow={1} shrink={1} wrap={false}>
                        <Header tag="h2" size={Header.Sizes.SIZE_20}>
                            Manage Repos
                        </Header>
                    </Flex.Child>
                    <Flex.Child basis="auto" grow={0} shrink={1} wrap={false}>
                        <ModalComponents.ModalCloseButton onClick={e.onClose} />
                    </Flex.Child>
                </ModalComponents.ModalHeader>

                <ModalComponents.ModalContent>
                    <FormSection>
                        <Flex
                            basis="auto"
                            grow={1}
                            shrink={1}
                            className="ysink_zone_row"
                        >
                            <TextInput
                                className="ysink_zone_input"
                                placeholder="https://example.com/repo"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e)}
                            />
                            <Button
                                className="ysink_zone_button"
                                onClick={() => {
                                    setInput("");
                                    addRepo(persist, input);
                                }}
                            >
                                Add
                            </Button>
                        </Flex>

                        <FormDivider className="ysink_zone_divide" />

                        {persist.ghost.repos.length == 0 ? (
                            <NoReposSplash />
                        ) : (
                            persist.ghost.repos.map((repo) => (
                                <RepoCard repo={repo} />
                            ))
                        )}
                    </FormSection>
                </ModalComponents.ModalContent>
            </ModalComponents.ModalRoot>
        </ErrorBoundary>
    );
};

export default () => openModal((e) => <RepoModalComponent e={e} />);
