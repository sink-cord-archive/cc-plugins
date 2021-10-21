import { findByProps } from "@cumcord/modules/webpack";
import { canBan, canKick, getGuildId } from "../permsHelper.js";
import openPalette from "../components/Palette.jsx";
import { openTextEntry } from "../components/TextEntryPalette.jsx";
const { getMembers } = findByProps("getMembers");
const { getUser } = findByProps("getUser");
const { banUser, kickUser } = findByProps("banUser");

const source = "Built In";

export default [
    {
        source,
        id: "moderation_banuser",
        label: "[MODERATION] Ban user from current guild",
        condition: canBan,
        action: () => {
            openPalette(
                "Which user to ban?",
                null,
                getMembers(getGuildId()).map((member) => {
                    let user = getUser(member.userId);
                    let nickstr = member.nick ? `[${member.nick}]` : "";
                    return {
                        id: member.userId,
                        label: `${user.username}#${user.discriminator} ${nickstr} (${member.userId})`,
                        action: () =>
                            openTextEntry("Enter ban reason", (reason) => {
                                banUser(
                                    getGuildId(),
                                    member.userId,
                                    null,
                                    reason
                                );
                            }),
                    };
                })
            );
        },
    },
    {
        source,
        id: "moderation_kickuser",
        label: "[MODERATION] Kick user from current guild",
        condition: canKick,
        action: () => {
            openPalette(
                "Which user to kick?",
                null,
                getMembers(getGuildId()).map((member) => {
                    let user = getUser(member.userId);
                    let nickstr = member.nick ? `[${member.nick}]` : "";
                    return {
                        id: member.userId,
                        label: `${user.username}#${user.discriminator} ${nickstr} (${member.userId})`,
                        action: () =>
                            openTextEntry("Enter kick reason", (reason) => {
                                kickUser(getGuildId(), member.userId, reason);
                            }),
                    };
                })
            );
        },
    },
];
