import getDb from "./usrbg-db";
import UserBanner from "./patches/UserBanner";
import FixAvatarPosition from "./patches/FixAvatarPosition";

// prevents patches from applying if async resolves post-unload
let cancelPatches = false;

let patches;

export async function onLoad() {
	const db_cache = await getDb();
	if (!cancelPatches)
		patches = [UserBanner(db_cache), FixAvatarPosition(db_cache)];
}

export function onUnload() {
	cancelPatches = true;
	_.forEachRight(patches, (p) => p());
}
