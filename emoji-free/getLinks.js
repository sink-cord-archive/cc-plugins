// https://github.com/luimu64/nitro-spoof/blob/1bb75a2471c39669d590bfbabeb7b922672929f5/utils.js

import { findByProps } from "@cumcord/modules/webpack";

const { getCustomEmojiById } = findByProps("getCustomEmojiById");
const { getLastSelectedGuildId } = findByProps("getLastSelectedGuildId");

function extractNonUsableEmojis(messageString, size) {
	let emojiStrings = messageString.matchAll(/<a?:(\w+):(\d+)>/gi);
	let emojiUrls = [];
	for (let emojiString of emojiStrings) {
		//fetch required info about the emoji
		let emoji = getCustomEmojiById(emojiString[2]);
		//check emoji usability
		if (
			emoji["guildId"] != getLastSelectedGuildId() ||
			emoji["animated"] ||
			isInDms()
		) {
			messageString = messageString.replace(emojiString[0], "");
			emojiUrls.push(
				emoji["url"].split("?")[0] + `?size=${size}&quality=lossless`
			);
		}
	}
	return { content: messageString.trim(), emojis: emojiUrls };
}

//returns true if the home button is selected
function isInDms() {
	return document
		.querySelector('[data-list-item-id="guildsnav___home"]')
		.classList.contains("selected-bZ3Lue");
}

function getEmojiLinks(size, msgArg) {
	//find all emojis from the captured message string and return object with emojiURLS and content
	const processedData = extractNonUsableEmojis(msgArg.content, size);

	msgArg.content = processedData.content;
	if (processedData.emojis.length > 0)
		msgArg.content += "\n" + processedData.emojis.join("\n");

	//set invalidEmojis to empty to prevent discord yelling to you about you not having nitro
	msgArg.invalidEmojis = [];

	//send modified message
	return msgArg;
}

export default getEmojiLinks;
