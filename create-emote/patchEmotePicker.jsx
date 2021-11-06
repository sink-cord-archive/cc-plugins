import { find } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import ContextMenuInjection from "./ContextMenuInjection.jsx";

export default () => {
    const EmojiContextMenu = find(
        (m) => m.default?.displayName === "ExpressionPickerContextMenu"
    );

    return after("default", EmojiContextMenu, ([{ target }], retVal) => {
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
    });
};
