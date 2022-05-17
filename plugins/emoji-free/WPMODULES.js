import { batchFind } from "@cumcord/modules/webpack";

export const [
	// nitro checks
	nitroInfo,
	stickerSendability,
	// emoji patches
	messageModule,
	uploadModule,
	// class
	{ selected },
	// store getters
	{ getCustomEmojiById },
	{ getLastSelectedGuildId },
	{ getStickerById },
	{ getStickerAssetUrl },
	{ getCurrentUser },
	// react components
	TextInput,
	ChannelTextAreaContainerModule, // memo -> forwardref -> component
] = batchFind(({ findByProps, findByDisplayName, find }) => {
	// nitro checks
	findByProps("canUseEmojisEverywhere");
	findByProps("isSendableSticker");
	// emoji patches
	findByProps("sendMessage");
	findByProps("uploadFiles");
	// class
	findByProps("childWrapper", "selected");
	// store getters
	findByProps("getCustomEmojiById");
	findByProps("getLastSelectedGuildId");
	findByProps("getStickerById");
	findByProps("getStickerAssetUrl");
	findByProps("getCurrentUser");
	// react components
	findByDisplayName("TextInput");
	find((m) => m?.type?.render?.displayName === "ChannelTextAreaContainer");
});
