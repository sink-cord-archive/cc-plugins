import { persist } from "@cumcord/pluginData";
import { find, findByProps } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import { findInReactTree } from "@cumcord/utils";

const { getMember } = findByProps("getMember");
const { getUser } = findByProps("getUser", "getCurrentUser");

// thx Strencher
const msg = find(
    (m) => m.type?.toString().indexOf("MESSAGE_A11Y_ROLE_DESCRIPTION") > -1
);

export default () =>
    after("type", msg, ([props], ret) => {
        if (persist.ghost.msg === false) return;

        const guildId = props.channel.guild_id;
        const authorId = props.message.author.id;

        const member = getMember(guildId, authorId);
        const user = getUser(authorId);

        const target = findInReactTree(ret, (e) => e?.childrenHeader)
            ?.childrenHeader.props.author;

        if (!target || !member?.nick) return;

        target.nick = `${member.nick} (${user.username})`;

        return ret;
    });
