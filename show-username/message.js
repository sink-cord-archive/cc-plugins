import { persist } from "@cumcord/pluginData";
import { after } from "@cumcord/patcher";
import { findInReactTree } from "@cumcord/utils";
import { getMember, getUser, MsgRoot } from "./WPMODULES";

export default after("type", MsgRoot, ([{ channel, message }], ret) => {
	if (!persist.ghost.msg) return;

	const target = findInReactTree(ret, (e) => e?.childrenHeader)?.childrenHeader
		.props.author;

	if (!target) return;

	const member = getMember(channel.guild_id, message.author.id);
	const user = getUser(message.author.id);

	if (member?.nick) target.nick = `${member.nick} (${user.username})`;

	return ret;
});
