import { findByProps, findByDisplayName } from "@cumcord/modules/webpack";
import { ErrorBoundary } from "@cumcord/ui/components";
import { showToast } from "@cumcord/ui/toasts";
import { uploadEmoji } from "./discordTools.js";
const useState = React.useState;
const { openModal } = findByProps("openModal");

const ModalComponents = findByProps("ModalCloseButton");
const Flex = findByDisplayName("Flex");
const Header = findByDisplayName("Header");
const FormSection = findByDisplayName("FormSection");
const FormText = findByDisplayName("FormText");
const TextInput = findByDisplayName("TextInput");
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");

const Component = ({ guildId, emoteUrl, e }) => {
    const [input, setInput] = useState("");

    return (
        <ErrorBoundary>
            <ModalComponents.ModalRoot
                transitionState={e.transitionState}
                size="small"
                className="ysink_emote_modal"
            >
                <ModalComponents.ModalHeader separator={false}>
                    <Flex.Child basis="auto" grow={1} shrink={1} wrap={false}>
                        <Header tag="h2" size={Header.Sizes.SIZE_20}>
                            Create Emote
                        </Header>
                    </Flex.Child>
                    <Flex.Child basis="auto" grow={0} shrink={1} wrap={false}>
                        <ModalComponents.ModalCloseButton onClick={e.onClose} />
                    </Flex.Child>
                </ModalComponents.ModalHeader>

                <ModalComponents.ModalContent>
                    <FormSection>
                        <div className="ysink_emote_row">
                            <FormText>
                                You are now creating an emote for the following
                                image:
                            </FormText>
                            <img src={emoteUrl} height="70" />
                        </div>

                        <Flex
                            basis="auto"
                            grow={1}
                            shrink={1}
                            className="ysink_emote_row"
                            /* stretch out some space in bottom of modal */
                            style={{ "margin-bottom": "1rem" }}
                        >
                            <TextInput
                                className="ysink_emote_input"
                                placeholder="myamazingemote"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e)}
                            />
                            <Button
                                className="ysink_emote_button"
                                onClick={() => {
                                    uploadEmoji(guildId, emoteUrl, input);
                                    showToast({
                                        title: `created emote ${input}`,
                                        duration: 3000,
                                    });
                                }}
                            >
                                Create Emote!
                            </Button>
                        </Flex>
                    </FormSection>
                </ModalComponents.ModalContent>
            </ModalComponents.ModalRoot>
        </ErrorBoundary>
    );
};

export default (guildId, emoteUrl) =>
    openModal((e) => <Component guildId={guildId} emoteUrl={emoteUrl} e={e} />);
