import { findByDisplayName } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import ContextMenuInjection from "./ContextMenuInjection.jsx";

import lazyPatcher from "./lazyPatcher.js";

export default () => {
    lazyPatcher.lazyPatchContextMenu(
        "ExpressionPickerContextMenu",
        (emojiContextMenu) => {
            lazyPatcher.registerPatch(
                after("default", emojiContextMenu, ([{ target }], retVal) => {
                    if (!target.firstChild.currentSrc) return retVal;
                    if (!Array.isArray(retVal.props.children.props.children))
                        retVal.props.children.props.children = [
                            retVal.props.children.props.children,
                        ];

                    retVal.props.children.props.children.push(
                        ContextMenuInjection({
                            isEmote: true,
                            emoteAlt: `:${target.dataset.name}:`,
                            url: target.firstChild.currentSrc,
                        })
                    );

                    return retVal;
                })
            );
        }
    );

    // both this and patchContextMenu export this,
    // but a second call wont cause any issues.
    return lazyPatcher.unpatchAll;
};
