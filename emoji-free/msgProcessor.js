// adapted from https://github.com/luimu64/nitro-spoof/blob/1bb75a2471c39669d590bfbabeb7b922672929f5/utils.js

import { persist } from "@cumcord/pluginData";
import {
	getCustomEmojiById,
	getLastSelectedGuildId,
	selected,
} from "./WPMODULES";

//returns true if the home button is selected
const isInDms = () =>
	document
		.querySelector('[data-list-item-id="guildsnav___home"]')
		.classList.contains(selected);

const getEmoteSize = () =>
	Number.isSafeInteger(parseInt(persist.ghost.size)) ? persist.ghost.size : 64;

// https://github.com/luimu64/nitro-spoof/blob/1bb75a2471c39669d590bfbabeb7b922672929f5/index.js#L25
const hasEmotesRegex = /<a?:(\w+):(\d+)>/i;

function extractUnusableEmojis(messageString, size) {
	const emojiStrings = messageString.matchAll(/<a?:(\w+):(\d+)>/gi);
	const emojiUrls = [];

	for (const emojiString of emojiStrings) {
		// fetch required info about the emoji
		const emoji = getCustomEmojiById(emojiString[2]);

		//check emoji usability
		if (
			emoji.guildId != getLastSelectedGuildId() ||
			emoji.animated ||
			isInDms()
		) {
			// remove emote from original msg
			messageString = messageString.replace(emojiString[0], "");
			// add to emotes to send
			emojiUrls.push(`${emoji.url.split("?")[0]}?size=${size}`);
		}
	}

	return [messageString.trim(), emojiUrls];
}

// fixes message object if needed, modifies by reference and does not return its arg
export default (msg) => {
	if (!msg.content.match(hasEmotesRegex)) return;

	//find all emojis from the captured message string and return object with emojiURLS and content
	const [newContent, extractedEmojis] = extractUnusableEmojis(
		msg.content,
		getEmoteSize()
	);

	msg.content = newContent;

	if (extractedEmojis.length > 0)
		msg.content += "\n" + extractedEmojis.join("\n");

	//set invalidEmojis to empty to prevent discord yelling to you about you not having nitro
	msg.invalidEmojis = [];

	// this function mutates its argument by reference, so setting the res is not necessary
	//return msg;
};
