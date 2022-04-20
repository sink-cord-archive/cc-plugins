import nitroChecks from "./patches/nitroChecks";
import sendMessage from "./patches/sendMessage";
import settings from "./Settings";

const patches = [nitroChecks(), sendMessage()];

export const onUnload = () => _.forEachRight(patches, p => p());

export { settings };
