import { findByProps } from "@cumcord/modules/webpack";
import { showToast } from "@cumcord/ui/toasts";
import { guildsCanManageEmotes, uploadEmoji } from "./discordTools.js";
import showCreateModal from "./CreateModal.jsx";

const ContextMenu = findByProps("MenuGroup", "default");

export default ({ isEmote, emoteAlt, url }) => (
    <ContextMenu.MenuItem
        id="ysink_emoji_msgitem"
        label={isEmote ? `Clone Emote ${emoteAlt}` : "Create Emote"}
    >
        {guildsCanManageEmotes().map((guild) => (
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
