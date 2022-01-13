import { instead } from "@cumcord/patcher";
import { findByProps } from "@cumcord/modules/webpack";

export default () => {
    const cuee = findByProps("canUseEmojisEverywhere");

    const serverCheck = instead("canUseEmojisEverywhere", cuee, () => true);

    const animatedCheck = instead("canUseAnimatedEmojis", cuee, () => true);

    return () => {
        serverCheck();
        animatedCheck();
    };
};
