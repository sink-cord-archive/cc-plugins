import { batchFind } from "@cumcord/modules/webpack";

export const [{ icon }, { children }, Clickable] = batchFind(
	({ findByProps, findByDisplayName }) => {
		findByProps("icon", "textRuler");
		findByProps("nameAndDecorators", "children");
		findByDisplayName("Clickable");
	}
);
