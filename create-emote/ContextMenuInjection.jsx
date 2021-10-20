import { findByProps } from "@cumcord/modules/webpack";
import { showToast } from "@cumcord/ui/toasts";
import { getGuilds, uploadEmoji } from "./discordTools.js";

const ContextMenu = findByProps("MenuGroup", "default");

export default ({ isEmote, emoteAlt, url }) => (
    <ContextMenu.MenuItem
        id="ysink_emoji_msgitem"
        label={isEmote ? `Clone Emote ${emoteAlt}` : "Create Emote"}
    >
        {getGuilds().map((guild) => (
            <ContextMenu.MenuItem
                label={guild.name}
                id={`ysink_emoji_server_${guild.id}`}
                action={() => {
                    let emoteNewName = emoteAlt?.substring(
                        1,
                        emoteAlt.length - 1
                    );
                    if (isEmote) {
                        uploadEmoji(guild.id, url, emoteNewName);
                        showToast({
                            title: `cloned emote ${emoteNewName}`,
                            duration: 3000,
                        });
                    } else showCreateModal(guild.id, url);
                }}
            />
        ))}
    </ContextMenu.MenuItem>
);
