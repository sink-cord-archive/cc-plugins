import { findByProps, findByDisplayName } from "@cumcord/modules/webpack";

import { ErrorBoundary } from "@cumcord/ui/components";
const ModalComponents = findByProps("ModalCloseButton");
const Header = findByProps("Sizes", "Tags");
const Flex = findByDisplayName("Flex");
const { openModal } = findByProps("openModalLazy");
const FormSection = findByDisplayName("FormSection");
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");
const Markdown = findByProps("rules");

const RepoModalComponent = ({ err, e }) => {
    return (
        <ErrorBoundary>
            <ModalComponents.ModalRoot
                transitionState={e.transitionState}
                size="small"
                className="ysink_palette_errormodal"
            >
                <ModalComponents.ModalHeader separator={false}>
                    <Flex.Child basis="auto" grow={1} shrink={1} wrap={false}>
                        <Header tag="h2" size={Header.Sizes.SIZE_20}>
                            We screwed up!!!
                        </Header>
                    </Flex.Child>
                    <Flex.Child basis="auto" grow={0} shrink={1} wrap={false}>
                        <ModalComponents.ModalCloseButton onClick={e.onClose} />
                    </Flex.Child>
                </ModalComponents.ModalHeader>

                <ModalComponents.ModalContent>
                    <FormSection>
                        <Markdown>{err}</Markdown>
                    </FormSection>
                </ModalComponents.ModalContent>
            </ModalComponents.ModalRoot>
        </ErrorBoundary>
    );
};

export default (err) =>
    openModal((e) => <RepoModalComponent {...{ e, err }} />);
