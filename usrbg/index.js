import getDb from "./usrbg-db.js";
import UserBanner from "./patches/UserBanner.jsx";
import FixAvatarPosition from "./patches/FixAvatarPosition.jsx";

export default () => {
	let patches;

	return {
		onLoad: async () => {
			const db_cache = await getDb();
			patches = [UserBanner(db_cache), FixAvatarPosition(db_cache)];
		},
		onUnload: () => _.forEachRight(patches, p => p()),
	};
};
