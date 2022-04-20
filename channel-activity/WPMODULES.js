import { batchFind } from "@cumcord/modules/webpack";

export const [{ icon }, { children }, MemberListItem] = batchFind(
	({ findByProps, findByDisplayName }) => {
		findByProps("icon", "textRuler");
		findByProps("nameAndDecorators");
		findByDisplayName("MemberListItem");
	}
);
