import { batchFind } from "@cumcord/modules/webpack";

export const [
	discordEmoteTools,
	{ getGuildPermissions },
	{ getGuilds },
	{ openModal },
	// react components
	{ MenuSeparator },
	{ MenuItem, ModalRoot, ModalHeader, ModalContent, ModalCloseButton },
	Flex,
	Header,
	FormSection,
	FormText,
	TextInput,
	Button,
] = batchFind(({ findByProps, findByDisplayName }) => {
	findByProps("uploadEmoji");
	findByProps("getGuildPermissions");
	findByProps("getGuilds");
	findByProps("openModalLazy");
	// react components
	findByProps("MenuGroup", "default");
	findByProps("ModalCloseButton");
	findByDisplayName("Flex");
	findByProps("Sizes", "Tags");
	findByDisplayName("FormSection");
	findByDisplayName("FormText");
	findByDisplayName("TextInput");
	findByProps("BorderColors");
});
