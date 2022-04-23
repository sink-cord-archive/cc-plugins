import { persist } from "@cumcord/pluginData";
import { after } from "@cumcord/patcher";
import { VoiceUsers } from "./WPMODULES";

export default after("render", VoiceUsers.prototype, (_, ret) => {
	if (!persist.ghost.vc || !ret?.props?.children?.[0]) return;

	for (const child of ret.props.children)
		if (child?.props?.nick)
			child.props.nick += ` (${child.props.user.username})`;

	return ret;
});
