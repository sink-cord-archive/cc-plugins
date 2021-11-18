import { after } from "@cumcord/patcher";
import { findByProps } from "@cumcord/modules/webpack";

export default () => after(
    "canUseAnimatedEmojis",
    findByProps("canUseEmojisEverywhere"),
    () => true
);
