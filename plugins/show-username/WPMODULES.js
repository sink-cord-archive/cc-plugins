import { batchFind } from "@cumcord/modules/webpack";

export const [
	VoiceUsers,
	FormText,
	Switch,
	{ getMember },
	{ getUser },
	MsgRoot,
	ConnectedChannelMembersParent,
] = batchFind(({ findByProps, findByDisplayName, find }) => {
	findByDisplayName("VoiceUsers");
	findByDisplayName("FormText");
	findByDisplayName("Switch");
	findByProps("getMember");
	findByProps("getUser", "_dispatcher");
	find((m) => m.type?.toString().indexOf("MESSAGE_A11Y_ROLE_DESCRIPTION") > -1);
	findByDisplayName("ConnectedChannelMembers", false);
});
