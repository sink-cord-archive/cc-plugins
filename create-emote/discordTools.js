import { findByProps } from "@cumcord/modules/webpack";

const discordEmoteTools = findByProps("uploadEmoji");
const { getGuildPermissions } = findByProps("getGuildPermissions");

const { getGuilds } = findByProps("getGuilds");

const MANAGE_EMOTES_PERMISSION = BigInt(1073741824);

const canManageEmotes = guildId => {
	let guildperms = getGuildPermissions({ id: guildId });
	if (guildperms && (guildperms & MANAGE_EMOTES_PERMISSION) !== 0n) {
		return true;
	} else {
		return false;
	}
};

const guildsCanManageEmotes = () =>
	Object.values(getGuilds()).filter(guild => canManageEmotes(guild.id));

// many many many tabs of stackoverflow and MDN, and about 30 mins later
const promisifiedFileReader = blob =>
	new Promise((resolve, reject) => {
		let filereader = new FileReader();
		filereader.onloadend = () => resolve(filereader.result);
		filereader.readAsDataURL(blob);
	});

const imageUrlToBase64 = async link =>
	await promisifiedFileReader(await (await fetch(link)).blob());

const uploadEmoji = (guildId, imageURL, name) => {
	imageUrlToBase64(imageURL).then(b64 =>
		discordEmoteTools.uploadEmoji(guildId, b64, name)
	);
};

export { getGuilds, canManageEmotes, uploadEmoji, guildsCanManageEmotes };
