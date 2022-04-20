import { persist } from "@cumcord/pluginData";
import { before } from "@cumcord/patcher";
import { findByProps } from "@cumcord/modules/webpack";
import getEmojiLinks from "../getLinks";

const emoteSize = Number.isSafeInteger(parseInt(persist.ghost.size))
	? persist.ghost.size
	: 64;

const regex = /<a?:(\w+):(\d+)>/i;

export default () => {
	const sendMessagePatch = before(
		"sendMessage",
		findByProps("sendMessage"),
		args => {
			// regex from https://github.com/luimu64/nitro-spoof/blob/1bb75a2471c39669d590bfbabeb7b922672929f5/index.js#L25
			if (args[1].content.match(regex)) {
				args[1] = getEmojiLinks(emoteSize, args[1]);
				return args;
			}
		}
	);

	const sendMessageAttachmentsPatch = before(
		"uploadFiles",
		findByProps("uploadFiles"),
		args => {
			// see sendMessage.js
			if (args[3]?.content.match(regex)) {
				args[3] = getEmojiLinks(emoteSize, args[3]);

				return args;
			}
		}
	);

	return () => {
		sendMessagePatch();
		sendMessageAttachmentsPatch();
	};
};
