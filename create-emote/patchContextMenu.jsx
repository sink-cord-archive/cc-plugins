import { findByProps, findByDisplayName } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import ContextMenuInjection from "./ContextMenuInjection.jsx";

import lazyPatcher from "./lazyPatcher.js";

const ContextMenu = findByProps("MenuGroup", "default");

export default () => {
    lazyPatcher.lazyPatchContextMenu(
        "MessageContextMenu",
        (messageContextMenu) => {
            lazyPatcher.registerPatch(
                after("default", messageContextMenu, (args, retVal) => {
                    let target = args[0].target;
                    let isEmote = !!target?.classList?.contains("emoji"); // double ! to force into a bool
                    if (
                        !target ||
                        !retVal?.props?.children ||
                        (!isEmote && target?.nodeName != "IMG") ||
                        (isEmote && target.alt.length <= 2) // alt is an actual emoji, not a cusom one!
                    )
                        return;

                    retVal.props.children.splice(
                        3,
                        0,
                        <ContextMenu.MenuSeparator />,
                        // see patchEmotePicker.jsx line 30
                        ContextMenuInjection({
                            isEmote: isEmote,
                            emoteAlt: target.alt,
                            url: target.currentSrc,
                        })
                    );

                    return retVal;
                })
            );
        }
    );

    return lazyPatcher.unpatchAll;
};

/* export default () => {
    const messageContextMenu = findByDisplayName("MessageContextMenu", false);

    return;
};s
 */ 