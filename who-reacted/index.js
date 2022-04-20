import { persist } from "@cumcord/pluginData";
import injectCss from "./styles.sass";
import settings from "./Settings";
import reaction from "./patchReaction";

persist.ghost.maxUsersShown ??= 6;
persist.ghost.reactionThreshold ??= 10;
persist.ghost.userThreshold ??= 100;
persist.ghost.useHighestUserCount ??= true;

const patches = [injectCss(), reaction()];

export const onUnload = () => _.forEachRight(patches, p => p?.());

export { settings };
