// huge credit to A Useer for the vizality original @ https://github.com/A-User-s-Discord-Plugins/emoji-util

import cssInject from "./styles.css";
import { findByProps, findByDisplayName, find } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import { getGuilds, guildsCanManageEmotes, uploadEmoji } from "./discordTools.js";
import showCreateModal from "./CreateModal.jsx"

const ContextMenu = findByProps("MenuGroup", "default");

const imageContentTypes = ["image/png"];

export default (data) => {
    let patches = [];

    return {
        onLoad() {
            patches.push(cssInject());

            // patch message context menu
            const messageContextMenu = find(
                (m) => m?.default?.displayName == "MessageContextMenu"
            );
            patches.push(
                after("default", messageContextMenu, (args, retVal) => {
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
                                        let emoteURL = target.currentSrc
                                        let guildId = guild.id
                                        let emoteNewName = target?.alt?.substring(1, target.alt.length - 1)
                                        isEmote
                                            ? uploadEmoji(guildId, emoteURL, emoteNewName)
                                            : showCreateModal(guildId, emoteURL)
                                    }}
                                />
                            ))}
                        </ContextMenu.MenuItem>
                    );

                    return retVal;
                })
            );
        },

        onUnload: () => patches.forEach((unpatch) => unpatch()),
    };
};
