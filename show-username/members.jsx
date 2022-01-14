import { persist } from "@cumcord/pluginData";
import { findByDisplayName } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";

export default () =>
    after(
        "render",
        findByDisplayName("MemberListItem").prototype,
        (args, ret) => {
            if (persist.ghost.ml === false) return;

            if (!ret?._owner?.pendingProps) return;
            // ew
            const pendProps = ret?._owner?.pendingProps;
            if (pendProps.nick)
                pendProps.nick = `${pendProps.nick} (${pendProps.user.username})`;

            return ret;
        }
    );
