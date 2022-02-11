import { id } from "@cumcord/pluginData"
import { importPlugin, removePlugin } from "@cumcord/plugins";
import { findByProps, findByDisplayName } from "@cumcord/modules/webpack";
const { openModal } = findByProps("openModalLazy");
const ModalComponents = findByProps("ModalCloseButton");
const Flex = findByDisplayName("Flex");
const FormSection = findByDisplayName("FormSection");
const FormText = findByDisplayName("FormText");
const Header = findByProps("Sizes", "Tags");

openModal((e) => (
    <ModalComponents.ModalRoot transitionState={e.transitionState}>
        <ModalComponents.ModalHeader separator={false}>
            <Flex.Child basis="auto" grow={1} shrink={1} wrap={false}>
                <Header tag="h2" size={Header.Sizes.SIZE_20}>
                    VPC-Shiki Notice
                </Header>
            </Flex.Child>
            <Flex.Child basis="auto" grow={0} shrink={1} wrap={false}>
                <ModalComponents.ModalCloseButton onClick={e.onClose} />
            </Flex.Child>
        </ModalComponents.ModalHeader>
        <ModalComponents.ModalContent>
            <FormSection>
                <FormText>
                    I deem this port too low-quality to use. Codeblocks+ has
                    been installed for you instead, if it wasnt already.
                </FormText>
            </FormSection>
        </ModalComponents.ModalContent>
    </ModalComponents.ModalRoot>
));

importPlugin("https://cumcordplugins.github.io/Condom/yellowsink.github.io/cc-plugins/codeblocks-plus/")
setTimeout(() => removePlugin(id));

export default {
    onUnload() {},
};
