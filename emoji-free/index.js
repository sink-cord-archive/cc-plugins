import nitroAnimatedCheck from "./patches/nitroAnimatedCheck";
import nitroServerCheck from "./patches/nitroServerCheck";
import sendMessage from "./patches/sendMessage";

export default () => {
    let patches = [nitroServerCheck(), nitroAnimatedCheck(), sendMessage()];

    return {
        onUnload: () => patches.forEach((unpatch) => unpatch?.()),
    };
};