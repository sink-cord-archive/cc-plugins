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
});
