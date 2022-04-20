import restoreThemes from "./patches/restoreThemes";
import settingsEntry from "./patches/settingsEntry";
import quickCSS from "./patches/quickCSS";
import exposeApi from "./patches/exposeApi";

import injectUiStyles from "./styles.sass";

import { persist } from "@cumcord/pluginData";
import defaultRepos from "./defaultRepos";

if (!Array.isArray(persist.ghost.repos)) defaultRepos();

if (!Array.isArray(persist.ghost.themes)) persist.store.themes = [];

const patches = [
	quickCSS(),
	restoreThemes(),
	exposeApi(),
	settingsEntry(),
	injectUiStyles(),
];

export const onUnload = () => _.forEachRight(patches, p => p());
