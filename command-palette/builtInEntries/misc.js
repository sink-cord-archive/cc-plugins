import { findByProps } from "@cumcord/modules/webpack";

import { getGuildId } from "../permsHelper.js";
const { updateChannelOverrideSettings } = findByProps(
    "updateChannelOverrideSettings"
);
const { getCurrentChannelSettings } = findByProps("getCurrentChannelSettings");
const { getChannelId } = findByProps("getChannelId", "getVoiceChannelId");
const { updateGuildNotificationSettings } = findByProps("updateGuildNotificationSettings");
const { isMuted } = findByProps("getMuteConfig")

const source = "Built In";

export default [
    {
        source,
        icon: "🔇",
        id: "misc_toggle_channel_mute",
        label: "Toggle current channel mute",
        action: () => {
            let muted = getCurrentChannelSettings(getGuildId(), getChannelId()).channel_is_muted;
            // i don't know if these last two fields are actually necessary or not, but just to be safe :)
            updateChannelOverrideSettings(getGuildId(), getChannelId(), {
                muted: !muted,
                suppress_everyone: !muted,
                suppress_roles: !muted,
            });
        },
    },
    {
        source,
        icon: "🔇",
        id: "misc_toggle_guild_mute",
        label: "Toggle current guild mute",
        action: () => {
            let muted = isMuted(getGuildId());
            updateGuildNotificationSettings(getGuildId(), {
                muted: !muted,
                suppress_everyone: !muted,
                suppress_roles: !muted,
            });
        },
    },
];
