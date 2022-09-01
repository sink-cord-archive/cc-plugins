import { persist } from "@cumcord/pluginData";
import { after } from "@cumcord/patcher";
import { findInReactTree } from "@cumcord/utils";
import { ConnectedChannelMembersParent } from "./WPMODULES";

export default after("default", ConnectedChannelMembersParent, (_, ret) => {
	if (!persist.ghost.ml) return;

	const rows = findInReactTree(ret, (e) => e?.rows)?.rows;
	if (!rows) return;

	for (const row of rows) {
		if (!row) continue;
		/*\
		|*| annoyingly, these objects persist between renders
		|*| so we need to patch them only once or
		|*| nick (user) (user) (user) (user) etc.
		|*| we do this by attaching a custom prop
		\*/
		row.YS_UN = 1;

		if (row?.type === "MEMBER" && !row.YS_UN && row.nick)
			row.nick = persist.ghost.paren
				? `${row.nick} (${row.user.username})`
				: row.user.username;
	}

	return ret;
});
