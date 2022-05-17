import { findByPropsAll, findAll } from "@cumcord/modules/webpack";
import { copyText, logger } from "@cumcord/utils";

const PERMUTATION_LIMIT = 1 << 23;

const getCombinations = (arr) => {
	let maxCount = 0;
	for (let i = 0; i < arr.length; i++) maxCount += 1 << i;

	maxCount = Math.min(maxCount, PERMUTATION_LIMIT);

	let binaryPermutations = [];
	for (let i = 0; i <= maxCount; i++) binaryPermutations.push(i);

	let allPermutations = [];
	for (const binPerm of binaryPermutations) {
		let working = [];
		for (let i = 0; i < arr.length; i++) {
			if (binPerm & (1 << i)) working.push(arr[i]);
		}

		if (working.length > 0) allPermutations.push(working);
	}

	return allPermutations.sort((a, b) => a.length - b.length);
};

const getKeys = (obj) => {
	let keys = Object.keys(obj);
	if (obj.__proto__) keys.push(...getKeys(obj.__proto__));
	return keys;
};

const findBest = (toFind) => {
	logger.warn(
		"!! THIS FUNCTION CAN BE VERY SLOW AND RAM INTENSIVE, FOR DEV ONLY !!"
	);

	if (!toFind) return { method: "unfindable" };

	if (toFind.displayName || toFind.default?.displayName) {
		const name = toFind.displayName ?? toFind.default.displayName;

		const modules = findAll(
			(m) =>
				(toFind.displayName ? m?.displayName : m?.default?.displayName) === name
		);

		if (modules[0] === toFind)
			return ["displayName", !!toFind.displayName, name];

		return [
			"displayNameAll",
			!!toFind.displayName,
			name,
			modules.findIndex((m) => m === toFind),
		];
	}

	let findViaProps = (toFind, noRec) => {
		const keys = getKeys(toFind);

		// try to get with only a single key first
		for (const key of keys)
			if (findByProps(key) === toFind) return ["props", [key], noRec];

		// use an array like this so we can find the smallest possible index,
		// an optimisation we dont have nearly enough cpu time for in the full search
		let keyIndexes = [];
		for (const key of keys) {
			const index = findByPropsAll(key).findIndex((m) => m === toFind);
			if (index !== -1) keyIndexes.push([key, index]);
		}
		keyIndexes.sort((a, b) => a[1] - b[1]);
		return ["propsAll", [keyIndexes[0][0]], keyIndexes[0][1], noRec];

		// now try to get with all key combinations
		const combinations = getCombinations(keys);
		let props = [];
		for (let i = 0; i < combinations.length; i++) {
			if (findByProps(...combinations[i]) !== toFind) continue;
			props = combinations[i];
			break;
		}

		if (props.length !== 0) return ["props", props, noRec];

		let index;
		for (let i = 0; i < combinations.length; i++) {
			index = findByPropsAll(...combinations[i]).findIndex((m) => m === toFind);
			if (index === -1) continue;
			props = combinations[i];
			break;
		}

		if (props.length !== 0) return ["propsAll", props, index, noRec];

		if (noRec) return ["unfindable"];

		return findViaProps(findAll((m) => m?.default === toFind)[0], true);
	};

	return findViaProps(toFind, false);
};

export default (module) => {
	const joinArgs = (args) => args.map(JSON.stringify).join(", ");
	const defaultFromRec = (rec) => (rec ? ".default" : "");
	const argFromParent = (parent) => (parent ? "" : ", false");

	const c = (str) => {
		logger.log("Copied module find code to clipboard.");
		copyText(str);
		return str;
	};

	const best = findBest(module);
	switch (best[0]) {
		case "unfindable":
			return false;

		case "props":
			return c(`findByProps(${joinArgs(best[1])})${defaultFromRec(best[2])}`);

		case "propsAll":
			return c(
				`findByPropsAll(${joinArgs(best[1])})[${best[2]}]${defaultFromRec(
					best[3]
				)}`
			);

		case "displayName":
			return c(
				`findByDisplayName(${JSON.stringify(best[2])}${argFromParent(best[1])})`
			);

		case "displayNameAll":
			if (best[1])
				return c(
					`findByDisplayNameAll(${JSON.stringify(best[2])})[${best[3]}]`
				);

			return c(
				`getModule(findByDisplayNameAll(${JSON.stringify(best[2])})[${
					best[3]
				}])`
			);
	}

	return best;
};
