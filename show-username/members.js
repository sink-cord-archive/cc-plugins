import { persist } from "@cumcord/pluginData";
import { after } from "@cumcord/patcher";
import { findInReactTree } from "@cumcord/utils";
import { ConnectedChannelMembersParent } from "./WPMODULES";

export default after("default", ConnectedChannelMembersParent, (_, ret) => {
	if (!persist.ghost.ml) return;

	const rows = findInReactTree(ret, (e) => e?.rows)?.rows;
	if (!rows) return;

	for (let i = 0; i < rows.length; i++) {
		/*\
			|*| annoyingly, these objects persist between renders
			|*| so we need to patch them only once or
			|*| nick (user) (user) (user) (user) etc.
			|*| we do this by attaching a custom prop
			\*/
		rows[i].YSINK_USERN_PATCHED = true;

		if (
			rows[i]?.type === "MEMBER" &&
			!rows[i].YSINK_USERN_PATCHED &&
			rows[i].nick
		)
			rows[i].nick += ` (${rows[i].user.username})`;
	}

	return ret;
});
