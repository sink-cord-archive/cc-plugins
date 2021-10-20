import { findByProps, find } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import { showToast } from "@cumcord/ui/toasts";
import {
    getGuilds,
    guildsCanManageEmotes,
    uploadEmoji,
} from "./discordTools.js";
import showCreateModal from "./CreateModal.jsx";

const ContextMenu = findByProps("MenuGroup", "default");

export default () => {
    const emojiPickerListRow = find(
        (m) => m?.default?.displayName == "EmojiPickerListRow"
    );

    return after("default", emojiPickerListRow, (args, retVal) => {
        console.log(retVal);
        if (!Array.isArray(res?.props?.children)) return retVal;
    });
};
