import { findByDisplayName } from "@cumcord/modules/webpack";
import { after, findAndPatch } from "@cumcord/patcher";
import ContextMenuInjection from "./ContextMenuInjection.jsx";
import { ContextMenu } from "./WPMODULES.js";
import { findInReactTree } from "@cumcord/utils";

export default () =>
	findAndPatch(
		() => findByDisplayName("MessageContextMenu", false),
		(MessageContextMenu) =>
			after("default", MessageContextMenu, ([{ target }], ret) => {
				const items = findInReactTree(ret, (n) => Array.isArray(n?.children));

				const isEmote = target?.classList?.contains("emoji");

				if (!isEmote && target?.nodeName !== "IMG")
					target = target?.nextSibling?.firstChild;

				if (
					!target ||
					!items ||
					(!isEmote && target?.nodeName != "IMG") ||
					(isEmote && target.alt.length <= 2) // alt is an actual emoji, not a cusom one!
				)
					return;

				items.children.splice(
					3,
					0,
					<ContextMenu.MenuSeparator />,
					// must not be createElement-ed
					ContextMenuInjection({
						isEmote,
						emoteAlt: target.alt,
						url: target.currentSrc,
					})
				);

				return ret;
			})
	);
