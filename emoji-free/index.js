import nitroChecks from "./patches/nitroChecks";
import sendMessage from "./patches/sendMessage";

export default () => {
    const patches = [nitroChecks(), sendMessage()];

    return {
        onUnload: () => _.forEachRight(patches, p => p()),
    };
};