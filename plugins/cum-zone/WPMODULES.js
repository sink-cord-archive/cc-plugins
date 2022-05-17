import { batchFind } from "@cumcord/modules/webpack";

export const [
	FormTitle,
	FormSection,
	FormDivider,
	FormText,
	Button,
	TextInput,
	Badges,
	ModalComponents,
	Header,
	Flex,
	{ openModal },
] = batchFind(({ findByProps, findByDisplayName }) => {
	findByDisplayName("FormTitle");
	findByDisplayName("FormSection");
	findByDisplayName("FormDivider");
	findByDisplayName("FormText");
	findByProps("BorderColors");
	findByDisplayName("TextInput");
	findByProps("BadgeShapes");
	findByProps("ModalCloseButton");
	findByProps("Sizes", "Tags");
	findByDisplayName("Flex");
	findByProps("openModalLazy");
});
