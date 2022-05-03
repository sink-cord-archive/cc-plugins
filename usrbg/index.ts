import classicMode from "./patches/classicMode";
import fixUserObjects from "./patches/fixUserObjects";
import patchBannerStyles from "./patches/patchBannerStyles";
import getDb from "./usrbg-db";

// prevents patches from applying if async resolves post-unload
let cancelPatches = false;

let patches: (() => void)[] = [];

export async function onLoad() {
	const db_cache = await getDb();

	if (!cancelPatches)
		patches = [
			patchBannerStyles(db_cache),
			fixUserObjects(db_cache),
			classicMode(db_cache),
		];
}

export function onUnload() {
	cancelPatches = true;
	window._.forEachRight(patches, (p) => p());
}

export { default as settings } from "./Settings";
