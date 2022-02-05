import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import { findInReactTree } from "@cumcord/utils";

const { avatarPositionPremium, avatarWrapperNormal } = findByProps(
    "avatarPositionPremium"
);

const Clickable = findByDisplayName("Clickable").prototype;

export default (db_cache) =>
    after("render", Clickable, (args, ret) => {
        // anonymous component, so we need to patch the (very heavily used) Clickable component and go from there.
        const wrapper = ret?.props?.children;
        if (!wrapper?.props?.className?.includes?.(avatarWrapperNormal)) return;

        // a bit hacky but it works - get the user ID from the avatar URL,
        // and only move the avatar downwards if they are present in the database.
        const avatarUrlSplit = findInReactTree(wrapper, "src")?.split("/");
        const userId = _.nth(avatarUrlSplit, -2);

        if (!db_cache.has(userId)) return;

        ret.props.children.props.className += ` ${avatarPositionPremium}`;
        return ret;
    });
