import { batchFind } from "@cumcord/modules/webpack";

export const [
	TextInput,
	{ getCustomEmojiById },
	{ getLastSelectedGuildId },
	nitroInfo,
	messageModule,
	uploadModule,
	{ selected },
] = batchFind(({ findByProps, findByDisplayName }) => {
	findByDisplayName("TextInput");
	findByProps("getCustomEmojiById");
	findByProps("getLastSelectedGuildId");
	findByProps("canUseEmojisEverywhere");
	findByProps("sendMessage");
	findByProps("uploadFiles");
	findByProps("childWrapper", "selected");
});
