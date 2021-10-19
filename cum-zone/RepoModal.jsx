import { findByProps, findByDisplayName } from "@cumcord/modules/webpack";
import { ErrorBoundary } from "@cumcord/ui/components";
import { useNest } from "@cumcord/utils";
import RepoCard from "./RepoCard.jsx";

const ModalComponents = findByProps("ModalCloseButton");
const Header = findByDisplayName("Header");
const Flex = findByDisplayName("Flex");
const { openModal } = findByProps("openModal");
const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
const FormSection = findByDisplayName("FormSection");

const RepoModalComponent = ({ nest, e }) => {
    useNest(nest);
    return (
        <ErrorBoundary>
            <ModalComponents.ModalRoot
                transitionState={e.transitionState}
                size="large"
                className="cumcord-settings-modal"
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
                    {nest.ghost.repos.map((repo) => (
                        <RepoCard repo={repo} nest={nest} />
                    ))}
                </ModalComponents.ModalContent>
            </ModalComponents.ModalRoot>
        </ErrorBoundary>
    );
};

export default (nest) =>
    openModal((e) => <RepoModalComponent nest={nest} e={e} />);
