import { ErrorBoundary } from "@cumcord/ui/components";
import { showToast } from "@cumcord/ui/toasts";
import { uploadEmoji } from "./discordTools";

import {
	openModal,
	ModalRoot,
	ModalHeader,
	ModalContent,
	ModalCloseButton,
	Flex,
	Header,
	FormSection,
	FormText,
	TextInput,
	Button,
} from "./WPMODULES";

const Component = ({ guildId, emoteUrl, e }) => {
	const [input, setInput] = React.useState("");

	return (
		<ErrorBoundary>
			<ModalRoot
				transitionState={e.transitionState}
				size="small"
				className="ysink_emote_modal"
			>
				<ModalHeader separator={false}>
					<Flex.Child basis="auto" grow={1} shrink={1} wrap={false}>
						<Header tag="h2" size={Header.Sizes.SIZE_20}>
							Create Emote
						</Header>
					</Flex.Child>
					<Flex.Child basis="auto" grow={0} shrink={1} wrap={false}>
						<ModalCloseButton onClick={e.onClose} />
					</Flex.Child>
				</ModalHeader>

				<ModalContent>
					<FormSection>
						<div className="ysink_emote_row">
							<FormText>
								You are now creating an emote for the following image:
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
								onChange={setInput}
							/>
							<Button
								className="ysink_emote_button"
								onClick={() => {
									uploadEmoji(guildId, emoteUrl, input);
									showToast({
										title: `created emote ${input}`,
										duration: 3000,
									});
									e.onClose();
								}}
							>
								Create Emote!
							</Button>
						</Flex>
					</FormSection>
				</ModalContent>
			</ModalRoot>
		</ErrorBoundary>
	);
};

export default (guildId, emoteUrl) =>
	openModal((e) => <Component guildId={guildId} emoteUrl={emoteUrl} e={e} />);
