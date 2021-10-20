import { findByProps, find } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import ContextMenuInjection from "./ContextMenuInjection.jsx";

const ContextMenu = findByProps("MenuGroup", "default");
const contextMenuTools = findByProps("openContextMenu");

export default () => {
    const emojiPickerListRow = find(
        (m) => m?.default?.displayName == "EmojiPickerListRow"
    );

    return after("default", emojiPickerListRow, (args, retVal) => {
        console.log(retVal);
        if (!Array.isArray(retVal?.props?.children)) return retVal;

        for (const emoji of retVal.props.children) {
            if (!emoji || !emoji?.props?.children) continue;

            let selectedEmoji = emoji.props.children.props.emoji;
            emoji.props.onContextMenu = (e) => {
                let selectedEmojiUrl = selectedEmoji.managed
                    ? `https://discord.com${selectedEmoji.url}`
                    : selectedEmoji.url;

                contextMenuTools.openContextMenu(e, () => (
                    <ContextMenu.default
                        onClose={contextMenuTools.closeContextMenu}
                    >
                        {/*
                            due to discord throwing errors if I just pass this as a component,
                            i'll call it manually,
                            as the root of this component is the allowed ContextMenu.MenuItem
                         */}
                        {ContextMenuInjection({
                            isEmote: true,
                            emoteAlt: `:${selectedEmoji.name}:`,
                            url: selectedEmojiUrl,
                        })}
                    </ContextMenu.default>
                ));
            };
        }
    });
};
