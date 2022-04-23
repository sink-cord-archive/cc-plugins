import { persist } from "@cumcord/pluginData";

const reset = (k, d) => {
	if (persist.ghost[k] === undefined) persist.store[k] = d;
};

reset("assign", true);
reset("otp", false);
reset("startupDev", true);
reset("disableCallbacks", true);

// no exports, these modules just do their thing and they do it in style.
import "./modules/startupDev";

// modules that unpatch
import api from "./api";
import callbacks from "./modules/callbacks";
import assign from "./modules/assign";

const modules = [api, callbacks, assign];

export const onUnload = () => _.forEachRight(modules, (p) => p?.());

export { default as settings } from "./Settings";
