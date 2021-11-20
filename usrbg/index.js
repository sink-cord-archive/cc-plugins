import { React } from "@cumcord/modules/common";
import Settings from "./Settings.jsx";

import getDb from "./usrbg-db.js";

import UserBanner from "./patches/UserBanner.jsx";
import FixAvatarPosition from "./patches/FixAvatarPosition.jsx";
import ClassicStyle from "./patches/ClassicStyle.jsx";

export default () => {
    let patches = [];

    getDb().then((db_cache) => {
        patches.push(
            UserBanner(db_cache),
            ClassicStyle(db_cache),
            FixAvatarPosition(db_cache)
        );
    });

    return {
        onUnload() {
            patches.forEach((unpatch) => unpatch?.());
        },
        settings: React.createElement(Settings),
    };
};
