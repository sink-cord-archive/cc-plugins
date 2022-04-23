import { findByDisplayName } from "@cumcord/modules/webpack";
import { after, findAndPatch } from "@cumcord/patcher";
import ContextMenuInjection from "./ContextMenuInjection.jsx";

export default () =>
	findAndPatch(
		() => findByDisplayName("ExpressionPickerContextMenu", false),
		(ExpressionPickerContextMenu) =>
			after("default", ExpressionPickerContextMenu, ([{ target }], ret) => {
				if (!target.firstChild.currentSrc) return;

				const subProps = ret.props.children.props;

				if (!Array.isArray(subProps.children))
					subProps.children = [subProps.children];

				subProps.children.push(
					ContextMenuInjection({
						isEmote: true,
						emoteAlt: `:${target.dataset.name}:`,
						url: target.firstChild.currentSrc,
					})
				);

				return ret;
			})
	);
