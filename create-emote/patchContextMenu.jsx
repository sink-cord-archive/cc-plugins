import { findByProps, find } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import { showToast } from "@cumcord/ui/toasts";
import {
    getGuilds,
    guildsCanManageEmotes,
    uploadEmoji,
} from "./discordTools.js";
import showCreateModal from "./CreateModal.jsx";
import ContextMenuInjection from "./ContextMenuInjection.jsx";

const ContextMenu = findByProps("MenuGroup", "default");

export default () => {
    const messageContextMenu = find(
        (m) => m?.default?.displayName == "MessageContextMenu"
    );

    return after("default", messageContextMenu, (args, retVal) => {
        let target = args[0].target;
        let isEmote = !!target?.classList?.contains("emoji"); // double ! to force into a bool
        if (
            !target ||
            !retVal?.props?.children ||
            (!isEmote && target?.nodeName != "IMG") ||
            target.alt.length <= 2 // alt is an actual emoji, not a cusom one!
        )
            return;

        retVal.props.children.splice(
            3,
            0,
            <ContextMenu.MenuSeparator />,
            <ContextMenuInjection
                isEmote={isEmote}
                emoteAlt={target.alt}
                url={target.sourceUrl}
                guilds={getGuilds()}
            />
        );

        return retVal;
    });
};
