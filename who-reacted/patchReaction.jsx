// https://github.com/jaimeadf/who-reacted/blob/main/index.js

import { forceUpdateAllReactions } from "./util";
import { persist } from "@cumcord/pluginData";
import { after } from "@cumcord/patcher";

import Reactors from "./Reactors";
import { Reaction } from "./WPMODULES";

const canShowReactors = ({ reactions }) => {
	const reactionThreshold = persist.ghost.reactionThreshold;
	const userThreshold = persist.ghost.userThreshold;

	if (reactionThreshold !== 0 && reactions.length > reactionThreshold)
		return false;

	if (userThreshold !== 0) {
		const userCount = persist.ghost.useHighestUserCount
			? Math.max(...reactions.map((r) => r.count))
			: reactions.reduce((acc, r) => acc + r.count, 0);

		if (userCount > userThreshold) return false;
	}

	return true;
};

export default () => {
	const unpatch = after("render", Reaction.prototype, function (args, ret) {
		// the this scope is that of the reaction object being patched.
		// for this reason this cannot be an arrow function as this would always be undefined.
		const { message, emoji, count } = this.props;

		if (canShowReactors(message)) {
			const renderTooltip = ret.props.children;

			ret.props.children = (props) => {
				const tooltip = renderTooltip(props);
				const popout = tooltip.props.children.props.children;

				const renderReactionInner = popout.props.children;
				popout.props.children = (props) => {
					const reactionInner = renderReactionInner(props);

					reactionInner.props.children.props.children.push(
						<Reactors
							{...{ message, emoji, count }}
							max={persist.ghost.maxUsersShown ?? 6}
						/>
					);

					return reactionInner;
				};

				return tooltip;
			};
		}

		return ret;
	});

	// re-render all reactions so that the first reactions visible as the plugin loads wont be unpatched
	forceUpdateAllReactions();

	return () => {
		unpatch();
		forceUpdateAllReactions();
	};
};
