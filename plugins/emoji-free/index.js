import nitroChecks from "./patches/nitroChecks";
import sendMessage from "./patches/sendMessage";
import stickers from "./patches/stickers";

const patches = [...nitroChecks, ...sendMessage, stickers];

export const onUnload = () => _.forEachRight(patches, (p) => p());

export { default as settings } from "./Settings";
