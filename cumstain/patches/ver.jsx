// why do i put in unnecesssary effort

import { findByDisplayName } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";

const Text = findByDisplayName("Text");

export default () =>
    after(
        "default",
        findByDisplayName("ClientDebugInfo", false),
        (args, ret) => {
            ret.props.children.push(
                <Text
                    color={Text.Colors.MUTED}
                    tag="span"
                    size={Text.Sizes.SIZE_12}
                >
                    {["cumstain", " ", "pre0.4", " "]}
                </Text>
            );
            return ret;
        }
    );
