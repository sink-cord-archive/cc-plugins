import { persist } from "@cumcord/pluginData";
import { findByDisplayName } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";

export default () =>
	after("render", findByDisplayName("VoiceUsers").prototype, (args, ret) => {
		if (persist.ghost.vc === false) return;

		if (!ret?.props?.children?.[0]) return;
		for (let i = 0; i < ret.props.children.length; i++) {
			const child = ret.props.children[0][i];
			if (child?.props?.nick)
				// const not consting moment
				child.props.nick += ` (${child.props.user.username})`;
		}

		return ret;
	});
