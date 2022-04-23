import { getModule } from "@cumcord/modules/webpack";
import { before } from "@cumcord/patcher";
import {
	ChannelTextAreaContainerModule,
	getCurrentUser,
	getStickerAssetUrl,
	getStickerById,
} from "../WPMODULES";
import { actualStickerSendability } from "./nitroChecks";

const ChannelTextAreaContainerModuleParent = getModule(
	ChannelTextAreaContainerModule
);

// un-memoify
const originalMemo = ChannelTextAreaContainerModule;
ChannelTextAreaContainerModuleParent.default =
	ChannelTextAreaContainerModule.type;

// patch
const unpatch = before(
	"render",
	ChannelTextAreaContainerModule.type,
	([arg]) => {
		const isSendable = (sticker) =>
			actualStickerSendability(sticker, getCurrentUser(), arg.channel);

		const oldSubmit = arg.onSubmit;

		arg.onSubmit = function (...args) {
			// only extract unsendable stickers
			const stickerUrls = args[0].stickers
				.map(getStickerById)
				.filter((s) => !isSendable(s))
				.map(getStickerAssetUrl);

			// only remove unsendable stickers
			args[0].stickers = args[0].stickers.filter((s) =>
				isSendable(getStickerById(s))
			);

			// TODO: Fix animated stickers

			args[0].value = `${args[0].value}\n${stickerUrls.join("\n")}`.trim();

			return oldSubmit.apply(this, args);
		};
	}
);

export default () => {
	ChannelTextAreaContainerModuleParent.default = originalMemo;
	unpatch();
};
