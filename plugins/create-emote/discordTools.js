import { discordEmoteTools, getGuildPermissions, getGuilds } from "./WPMODULES";

const MANAGE_EMOTES_PERMISSION = 1073741824n;

const canManageEmotes = (guildId) => {
	const gPerms = getGuildPermissions({ id: guildId });
	return gPerms && (gPerms & MANAGE_EMOTES_PERMISSION) !== 0n;
};

const guildsCanManageEmotes = () =>
	Object.values(getGuilds()).filter((guild) => canManageEmotes(guild.id));

const downloadToB64 = (link) =>
	new Promise(async (resolve) => {
		const blob = await (await fetch(link)).blob();
		const fr = new FileReader();
		fr.onloadend = () => resolve(fr.result);
		fr.readAsDataURL(blob);
	});

const uploadEmoji = (guildId, imageURL, name) =>
	downloadToB64(
		imageURL.replace("media.discordapp.net", "cdn.discordapp.com")
	).then((image) => discordEmoteTools.uploadEmoji({ guildId, image, name }));

export { canManageEmotes, uploadEmoji, guildsCanManageEmotes };
