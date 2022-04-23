import { batchFind } from "@cumcord/modules/webpack";

export const [
	{ Reaction },
	ReactionStore,
	VoiceUserSummaryItem,
	TextInput,
	Slider,
	Switch,
	FormText,
] = batchFind(({ findByProps, findByDisplayName }) => {
	findByProps("Reaction");
	findByProps("getReactions", "_dispatcher");
	findByDisplayName("VoiceUserSummaryItem");
	findByDisplayName("TextInput");
	findByDisplayName("Slider");
	findByDisplayName("Switch");
	findByDisplayName("FormText");
});
