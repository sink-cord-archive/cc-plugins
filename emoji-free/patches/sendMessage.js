import { persist } from "@cumcord/pluginData";
import { before } from "@cumcord/patcher";
import getEmojiLinks from "../getLinks";
import { uploadModule, messageModule } from "../WPMODULES";

const getEmoteSize = () =>
	Number.isSafeInteger(parseInt(persist.ghost.size)) ? persist.ghost.size : 64;

// https://github.com/luimu64/nitro-spoof/blob/1bb75a2471c39669d590bfbabeb7b922672929f5/index.js#L25
const regex = /<a?:(\w+):(\d+)>/i;

export default () => {
	const sendMessagePatch = before("sendMessage", messageModule, args => {
		if (args[1].content.match(regex)) {
			args[1] = getEmojiLinks(getEmoteSize(), args[1]);
			return args;
		}
	});

	const sendMessageAttachmentsPatch = before(
		"uploadFiles",
		uploadModule,
		args => {
			if (args[0].parsedMessage.content.match(regex)) {
				args[0].parsedMessage = getEmojiLinks(
					getEmoteSize(),
					args[0].parsedMessage
				);

				return args;
			}
		}
	);

	return () => {
		sendMessagePatch();
		sendMessageAttachmentsPatch();
	};
};
