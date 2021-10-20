import { findByProps } from "@cumcord/modules/webpack";
const ContextMenu = findByProps("MenuGroup", "default");

export default ({ isEmote, emoteAlt, url, guilds }) => (
    <ContextMenu.MenuItem
                id="ysink_emoji_msgitem"
                label={
                    isEmote
                        ? `Clone Emote ${emoteAlt}`
                        : "Create Emote"
                }
            >
                {guilds.map((guild) => (
                    <ContextMenu.MenuItem
                        label={guild.name}
                        id={`ysink_emoji_server_${guild.id}`}
                        action={() => {
                            let emoteNewName = target?.alt?.substring(
                                1,
                                target.alt.length - 1
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
)