import { findByPropsAll, findAll } from "@cumcord/modules/webpack";

const PERMUTATION_LIMIT = 1 << 23;

const getPermutations = (arr) => {
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

export default (toFind) => {
    console.warn("!! THIS FUNCTION CAN BE VERY SLOW AND RAM INTENSIVE !!");

    if (!toFind) return { method: "unfindable" };

    if (toFind.displayName || toFind.default?.displayName) {
        const name = toFind.displayName ?? toFind.default.displayName;

        const modules = findAll(
            (m) =>
                (toFind.displayName
                    ? m?.displayName
                    : m?.default?.displayName) === name
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

    const keys = getKeys(toFind);
    const permutations = getPermutations(keys);
    let props = [];
    for (let i = 0; i < permutations.length; i++) {
        if (findByProps(...permutations[i]) !== toFind) continue;
        props = permutations[i];
        break;
    }

    if (props.length !== 0) return ["props", props];

    let index = 0;
    for (let i = 0; i < permutations.length; i++) {
        const modules = findByPropsAll(...permutations[i]);
        const mIndex = modules.findIndex((m) => m === toFind);
        if (mIndex === -1) continue;
        props = permutations[i];
        index = mIndex;
        break;
    }

    if (props.length !== 0) return ["propsAll", props, index];

    return ["unfindable"];
};
