import { findByProps } from "@cumcord/modules/webpack";
import { showToast } from "@cumcord/ui/toasts";
import openPalette from "../components/Palette.jsx";
import { openTextEntry } from "../components/TextEntryPalette.jsx";
import { getGuildId } from "../permsHelper.js";
const { getMembers } = findByProps("getMembers");
const { getUser } = findByProps("getUser");
const { openUserProfileModal } = findByProps("openUserProfileModal");

const source = "Built In";
const icon = "🚀";

export default [
    {
        source,
        icon,
        id: "navigate_user_profile_id",
        label: "Open user profile by ID",
        action: () => {
            openTextEntry("Enter user ID", (id) => {
                setTimeout(() => {
                    try {
                        openUserProfileModal({ userId: id });
                    } catch {
                        showToast({
                            title: "Failed! - Is the user ID correct?",
                            duration: 3000,
                        });
                    }
                }, 200);
            });
        },
    },
    {
        source,
        icon,
        id: "navigate_user_profile_server",
        label: "Open user profile from current server",
        action: () => {
            openPalette(
                "Which profile to open?",
                null,
                getMembers(getGuildId()).map((member) => {
                    let user = getUser(member.userId);
                    let nickstr = member.nick ? `[${member.nick}]` : "";
                    return {
                        id: member.userId,
                        label: `${user.username}#${user.discriminator} ${nickstr} (${member.userId})`,
                        action: () =>
                            setTimeout(
                                () =>
                                    openUserProfileModal({
                                        userId: member.userId,
                                    }),
                                200
                            ),
                    };
                })
            );
        },
    },
];
