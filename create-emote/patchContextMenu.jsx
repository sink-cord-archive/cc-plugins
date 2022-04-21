import { findByDisplayName } from "@cumcord/modules/webpack";
import { after, findAndPatch } from "@cumcord/patcher";
import ContextMenuInjection from "./ContextMenuInjection.jsx";
import { ContextMenu } from "./WPMODULES.js";

export default () =>
	findAndPatch(
		() => findByDisplayName("MessageContextMenu", false),
		(MessageContextMenu) =>
			after("default", MessageContextMenu, ([{ target }], ret) => {
				debugger;
				const isEmote = target?.classList?.contains("emoji");

				if (!isEmote && target?.nodeName !== "IMG")
					target = target?.nextSibling?.firstChild;

				if (
					!target ||
					!ret?.props?.children ||
					(!isEmote && target?.nodeName != "IMG") ||
					(isEmote && target.alt.length <= 2) // alt is an actual emoji, not a cusom one!
				)
					return;

				ret.props.children.splice(
					3,
					0,
					<ContextMenu.MenuSeparator />,
					// see patchEmotePicker.jsx line 30
					ContextMenuInjection({
						isEmote,
						emoteAlt: target.alt,
						url: target.currentSrc,
					})
				);

				return ret;
			})
	);
