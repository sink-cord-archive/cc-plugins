// https://github.com/jaimeadf/who-reacted/blob/main/index.js

import { findInTree, getReactInstance, sleep } from "@cumcord/utils";
import { findByProps } from "@cumcord/modules/webpack";

const reactionClass = findByProps("reaction").reaction;

// powercord things sometimes make me go "whyyyy"
// https://github.com/powercord-org/powercord/blob/v2/src/fake_node_modules/powercord/util/waitFor.js
// except i made it much less of a performance NIGHTMARE
const waitFor = async className => {
	let elem;
	while (!(elem = document.getElementsByClassName(className)[0]))
		await sleep(50);

	return elem;
};

const findReactionReactElement = node =>
	findInTree(getReactInstance(node), r => r?.type?.displayName === "Reaction", {
		walkable: ["return"],
	});

const findReaction = async () =>
	findReactionReactElement(await waitFor(reactionClass)).type;

const forceUpdateAllReactions = () => {
	const elems = document.getElementsByClassName(reactionClass);
	for (const elem of elems)
		findReactionReactElement(elem).stateNode.forceUpdate();
};

export { findReaction, forceUpdateAllReactions };
