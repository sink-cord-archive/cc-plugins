import { find, findByProps } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";

const { getMember } = findByProps("getMember");
const { getUser } = findByProps("getUser", "getCurrentUser");
// thx Strencher
const msg = find(
    (m) => m.type?.toString().indexOf("MESSAGE_A11Y_ROLE_DESCRIPTION") > -1
);

export default () =>
    after(
        "type",
        msg,
        (
            [
                // this is fine... (sorry lol)
                {
                    channel: { guild_id: guildId },
                    message: {
                        author: { id: authorId },
                    },
                },
            ],
            ret
        ) => {
            const member = getMember(guildId, authorId);
            const user = getUser(authorId);

            if (
                member?.nick &&
                ret.props.children.props.children.props.childrenHeader.props
                    .author
            )
                ret.props.children.props.children.props.childrenHeader.props.author.nick = `${member.nick} (${user.username})`;

            return ret;
        }
    );
