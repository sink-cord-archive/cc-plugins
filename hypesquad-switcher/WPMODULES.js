import { batchFind } from "@cumcord/modules/webpack";

export const [
	JoinHypeSquadCTA,
	Button,
	Text,
	{ joinHypeSquadOnline },
	{ getHouseNameFromHouseID },
] = batchFind(({ findByProps, findByDisplayName }) => {
	findByDisplayName("JoinHypeSquadCTA");
	findByProps("Sizes", "Colors", "Looks", "DropdownSizes");
	findByDisplayName("Text");
	// TODO: ASYNC FIND!
	findByProps("joinHypeSquadOnline");
	findByProps("getQuestions");
});
