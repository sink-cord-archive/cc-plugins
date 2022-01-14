import { persist } from "@cumcord/pluginData";
import { findByDisplayName } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";

export default () =>
    after(
        "default",
        findByDisplayName("ConnectedChannelMembers", false),
        (args, ret) => {
            if (persist.ghost.ml === false) return;

            if (!ret?.props?.children?.props?.children?.props?.rows) return;
            const rows = ret.props.children.props.children.props.rows;

            for (let i = 0; i < rows.length; i++) {
                if (rows[i]?.type !== "MEMBER" || rows[i].YSINK_USERN_PATCHED)
                    continue;
                // HAHA I CAN ATTACH STUFF TO THESE!!!!!!!
                // annoyingly, these objects persist between renders
                // so we need to patch them only once or
                // nick (user) (user) (user) (user) etc.
                rows[i].YSINK_USERN_PATCHED = true;
                if (rows[i].nick)
                    rows[i].nick = `${rows[i].nick} (${rows[i].user.username})`;
            }

            return ret;
        }
    );
