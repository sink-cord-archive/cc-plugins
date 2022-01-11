import nitroChecks from "./patches/nitroChecks";
import sendMessage from "./patches/sendMessage";
import sendMessageAttachments from "./patches/sendMessageAttachments";

export default () => {
    const patches = [nitroChecks(), sendMessage(), sendMessageAttachments()];

    return {
        onUnload: () => _.forEachRight(patches, p => p()),
    };
};