import data from "@cumcord/pluginData";
import api from "./api";
import callbacks from "./modules/callbacks";
import common from "./modules/common";
import patcher from "./modules/patcher";
import webpack from "./modules/webpack";
import dev from "@cumcord/dev";

const unloadApi = api();

if (!Array.isArray(data.persist.ghost.enabledModules))
	data.persist.store.enabledModules = [
		"webpack",
		"common",
		"patcher",
		"callbacks",
	];

const modules = {
	webpack: [webpack, "Exposes webpack modules to window"],
	common: [common, "Exposes common modules (react etc) to window"],
	patcher: [patcher, "Exposes patcher to window"],
	callbacks: [callbacks, "Disables spam logs on devtools open"],
};

let loaded = [];

const toLoad = data.persist.ghost.enabledModules;
for (const module of toLoad) loaded.push(modules[module]?.[0]());

if (dev && !dev.isEnabled) dev.toggleDevMode();

export default {
	onUnload() {
		_.forEachRight(loaded, p => p?.());
		unloadApi();
	},
};
