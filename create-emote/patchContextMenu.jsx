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
            <ContextMenu.MenuItem
                id="ysink_emoji_msgitem"
                label={
                    isEmote
                        ? `Clone Emote ${args[0].target.alt}`
                        : "Create Emote"
                }
            >
                {getGuilds().map((guild) => (
                    <ContextMenu.MenuItem
                        label={guild.name}
                        id={`ysink_emoji_server_${guild.id}`}
                        action={() => {
                            let emoteURL = target.currentSrc;
                            let guildId = guild.id;
                            let emoteNewName = target?.alt?.substring(
                                1,
                                target.alt.length - 1
                            );
                            if (isEmote) {
                                uploadEmoji(guildId, emoteURL, emoteNewName);
                                showToast({
                                    title: `cloned emote ${emoteNewName}`,
                                    duration: 3000,
                                });
                            } else showCreateModal(guildId, emoteURL);
                        }}
                    />
                ))}
            </ContextMenu.MenuItem>
        );

        return retVal;
    });
};
