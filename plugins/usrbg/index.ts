import getDb from "./usrbg-db";
import patchBanner from "./patches/patchBanner";

// prevents patches from applying if async resolves post-unload
let cancelPatches = false;

let unpatchBanner;

export async function onLoad() {
	const db_cache = await getDb();

	if (!cancelPatches)
		unpatchBanner = patchBanner(db_cache);
}

export function onUnload() {
	cancelPatches = true;
	unpatchBanner?.();
}
