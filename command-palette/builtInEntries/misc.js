import { findByProps } from "@cumcord/modules/webpack";

import { getGuildId } from "../permsHelper.js";
const { updateChannelOverrideSettings } = findByProps(
    "updateChannelOverrideSettings"
);
const { getCurrentChannelSettings } = findByProps("getCurrentChannelSettings");
const { getChannelId } = findByProps("getChannelId", "getVoiceChannelId");

const source = "Built In";

export default [
    {
        source,
        icon: "🔇",
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
];
