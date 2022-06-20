import { persist } from "@cumcord/pluginData";

import injectCss from "./styles.sass";
import settingsEntryPatch from "./patches/settingsEntry.js";
import resetReposToDefault from "./defaultRepos.js";

const patches = [injectCss(), settingsEntryPatch()];

if (!Array.isArray(persist.ghost.repos)) resetReposToDefault(persist.store);

export const onUnload = () => _.forEachRight(patches, (p) => p());
