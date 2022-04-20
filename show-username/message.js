import { persist } from "@cumcord/pluginData";
import { after } from "@cumcord/patcher";
import { findInReactTree } from "@cumcord/utils";
import { getMember, getUser, MsgRoot } from "./WPMODULES";

export default after("type", MsgRoot, ([props], ret) => {
	if (!persist.ghost.msg) return;

	const guildId = props.channel.guild_id;
	const authorId = props.message.author.id;

	const member = getMember(guildId, authorId);
	const user = getUser(authorId);

	const target = findInReactTree(ret, (e) => e?.childrenHeader)?.childrenHeader
		.props.author;

	if (!target || !member?.nick) return;

	target.nick = `${member.nick} (${user.username})`;

	return ret;
});
