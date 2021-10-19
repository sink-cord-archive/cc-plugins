// huge credit to A Useer for the vizality original @ https://github.com/A-User-s-Discord-Plugins/emoji-util

import cssInject from "./styles.css";
import { findByProps, findByDisplayName, find } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";

const ContextMenu = findByProps("MenuGroup", "default");

const imageContentTypes = ["image/png"];

export default (data) => {
    let patches = [];

    return {
        onLoad() {
            patches.push(cssInject());

            // patch message context menu
            const messageContextMenu = find(
                (m) => m?.default?.displayName == "MessageContextMenu"
            );
            patches.push(
                after("default", messageContextMenu, (args, retVal) => {
                    console.log(args);
                    let target = args[0].target;
                    let isEmote = !!target?.classList?.contains("emoji"); // double ! to force into a bool
                    if (
                        !target ||
                        !retVal?.props?.children ||
                        (!isEmote && target?.nodeName != "IMG")
                    )
                        return;

                    retVal.props.children.splice(
                        3,
                        0,
                        <ContextMenu.MenuSeparator />,
                        <ContextMenu.MenuItem
                            id="ysink_emoji_msgitem"
                            label="Create Emote"
                        >
                            {isEmote ? (
                                <ContextMenu.MenuItem
                                    id="ysink_emoji_msgsub_emote"
                                    label="Emote"
                                />
                            ) : (
                                <ContextMenu.MenuItem
                                    id="ysink_emoji_msgsub_image"
                                    label="Image"
                                />
                            )}
                        </ContextMenu.MenuItem>
                    );

                    return retVal;
                })
            );
        },

        onUnload: () => patches.forEach((unpatch) => unpatch()),
    };
};
