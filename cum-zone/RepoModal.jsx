// most of this is adapted from https://github.com/Cumcord/Cumcord/blob/stable/src/api/ui/settings/pluginSettings.jsx
// design inspired by the GooseMod repos modal

import { findByProps, findByDisplayName } from "webpackModules";

const ModalComponents = findByProps("ModalCloseButton");
const Header = findByDisplayName("Header");
const Flex = findByDisplayName("Flex");
const { openModal } = findByProps("openModal");

const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
const FormSection = findByDisplayName("FormSection");

export default (repos_proxy) =>
    openModal((e) => {
        return (
            <ModalComponents.ModalRoot
                transitionState={e.transitionState}
                size="large"
                className="cumcord-settings-modal"
            >
                <ModalComponents.ModalHeader separator={false}>
                    <Flex.Child basis="auto" grow={1} shrink={1} wrap={false}>
                        <Header tag="h2" size={Header.Sizes.SIZE_20}>
                            {pluginName}
                        </Header>
                    </Flex.Child>
                    <Flex.Child basis="auto" grow={0} shrink={1} wrap={false}>
                        <ModalComponents.ModalCloseButton onClick={e.onClose} />
                    </Flex.Child>
                </ModalComponents.ModalHeader>

                <ModalComponents.ModalContent>
                    {repos_proxy.map((repo) => (
                        <div /> // unfinished
                    ))}
                </ModalComponents.ModalContent>
            </ModalComponents.ModalRoot>
        );
    });
