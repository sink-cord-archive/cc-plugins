import { findByProps, findByDisplayName } from "@cumcord/modules/webpack";
import { ErrorBoundary } from "@cumcord/ui/components";
import { useNest } from "@cumcord/utils";
import RepoCard from "./RepoCard.jsx";
import NoReposSplash from "./NoReposSplash.jsx";
import getPlugins from "./pluginFetcher.js";
import { showToast } from "@cumcord/ui/toasts";

const useState = React.useState;
const ModalComponents = findByProps("ModalCloseButton");
const Header = findByDisplayName("Header");
const Flex = findByDisplayName("Flex");
const { openModal } = findByProps("openModal");
const FormSection = findByDisplayName("FormSection");
const FormDivider = findByDisplayName("FormDivider");
const TextInput = findByDisplayName("TextInput");
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");

function verifyRepo(repo) {
    try {
        getPlugins(repo);
        return true;
    } catch {
        return false;
    }
}

const RepoModalComponent = ({ nest, e }) => {
    const [input, setInput] = useState("");

    useNest(nest);
    return (
        <ErrorBoundary>
            <ModalComponents.ModalRoot
                transitionState={e.transitionState}
                size="large"
                className="ysink_modal"
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
                        <Flex basis="auto" grow={1} shrink={1} className="ysink_row">
                            <TextInput
                                className="ysink_input"
                                placeholder="https://example.com/repo.json"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e)}
                            />
                            <Button
                                onClick={() => {
                                    setInput("");
                                    if (verifyRepo(input)) {
                                        // copy like this to correctly raise events
                                        let repos = nest.ghost.repos;
                                        repos.push({
                                            url: input,
                                            name: "new repo",
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
                                }}
                            >
                                Add
                            </Button>
                        </Flex>

                        <FormDivider className="ysink_divide" />

                        {nest.ghost.repos.length == 0 ? (
                            <NoReposSplash store={nest.store} />
                        ) : (
                            nest.ghost.repos.map((repo) => (
                                <RepoCard repo={repo} nest={nest} />
                            ))
                        )}
                    </FormSection>
                </ModalComponents.ModalContent>
            </ModalComponents.ModalRoot>
        </ErrorBoundary>
    );
};

export default (nest) =>
    openModal((e) => <RepoModalComponent nest={nest} e={e} />);
