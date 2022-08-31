import { persist } from "@cumcord/pluginData";
import { loaded, togglePlugin } from "@cumcord/plugins";

if (persist.ghost.bisecting === undefined)
	Object.assign(persist.store, {
		bisecting: false,
		tree: null,
		rightNode: null,
		lastBatchOkay: null,
	});

const enablePlugin = (id) => loaded.ghost[id] || togglePlugin(id);
const disablePlugin = (id) => loaded.ghost[id] && togglePlugin(id);

const recursiveTreeGenerator = (flatNodes) => {
	if (flatNodes.length < 3) return flatNodes;

	const half = Math.ceil(flatNodes.length / 2);
	return [
		recursiveTreeGenerator(flatNodes.slice(0, half)),
		recursiveTreeGenerator(flatNodes.slice(half)),
	];
};

const treeFlattener = (tree) => [
	...(Array.isArray(tree[0]) ? treeFlattener(tree[0]) : [tree[0]]),
	...(tree[1]
		? Array.isArray(tree[1])
			? treeFlattener(tree[1])
			: [tree[1]]
		: []),
];

export function startBisect() {
	if (persist.ghost.bisecting) return;
	persist.store.bisectTargets = Object.keys(loaded.ghost);
	persist.store.tree = recursiveTreeGenerator(persist.ghost.bisectTargets);
	persist.store.rightNode = true;
	persist.store.lastBatchOkay = false;
}

export function startBatch() {
	if (!persist.ghost.bisecting) return;
}

export function thisBatchOkay() {
	if (!persist.ghost.bisecting) return;
}

export function thisBatchBad() {
	if (!persist.ghost.bisecting) return;
}

export function finishBisect() {
	if (!persist.ghost.bisecting) return;
	treeFlattener(persist.ghost.tree).forEach(enablePlugin);
	persist.store.bisecting = false;
	persist.store.tree = null;
	persist.store.rightNode = null;
	persist.store.lastBatchOkay = null;
}
