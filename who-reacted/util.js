// https://github.com/jaimeadf/who-reacted/blob/main/index.js

import { findInTree, getReactInstance } from "@cumcord/utils";
import { findByProps } from "@cumcord/modules/webpack";

const reactionClass = findByProps("reaction").reaction;

const findReactionReactElement = node =>
	findInTree(getReactInstance(node), r => r?.type?.displayName === "Reaction", {
		walkable: ["return"],
	});

const forceUpdateAllReactions = () => {
	for (const elem of document.getElementsByClassName(reactionClass))
		findReactionReactElement(elem).stateNode.forceUpdate();
};

export { forceUpdateAllReactions };
