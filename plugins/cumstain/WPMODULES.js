import { batchFind } from "@cumcord/modules/webpack";

export const [
	FormTitle,
	FormText,
	FormSection,
	Button,
	Switch,
	Badges,
	Flex,
	Select_parent,
	TextInput,
	SmallMediaCarousel,
	SearchBar,
	{ thin: scrollBarThin },
	ModalComponents,
	{ openModal },
] = batchFind(({ findByProps, findByDisplayName }) => {
	findByDisplayName("FormTitle");
	findByDisplayName("FormText");
	findByDisplayName("FormSection");
	findByProps("BorderColors");
	findByDisplayName("Switch");
	findByProps("BadgeShapes");
	findByDisplayName("Flex");
	findByDisplayName("Select", false);
	findByDisplayName("TextInput");
	findByDisplayName("SmallMediaCarousel");
	findByDisplayName("SearchBar");
	findByProps("scrollerBase", "thin");
	findByProps("ModalCloseButton");
	findByProps("openModalLazy");
});
