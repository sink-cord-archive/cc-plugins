import getDb from "./usrbg-db.js";
import UserBanner from "./patches/UserBanner.jsx";
import FixAvatarPosition from "./patches/FixAvatarPosition.jsx";

export default () => {
    let patches = [];

    getDb().then((db_cache) => {
        patches = [UserBanner(db_cache), FixAvatarPosition(db_cache)];
    });

    return {
        onUnload: () => patches.forEach((unpatch) => unpatch?.()),
    };
};
