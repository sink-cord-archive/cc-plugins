import { instead } from "@cumcord/patcher";
import { nitroInfo, stickerSendability } from "../WPMODULES";

// stickers.js wants to have the real sendability check available
export const actualStickerSendability = stickerSendability.isSendableSticker;

export default [
	instead("canUseEmojisEverywhere", nitroInfo, () => true),
	instead("canUseAnimatedEmojis", nitroInfo, () => true),
	instead("isSendableSticker", stickerSendability, () => true),
];
