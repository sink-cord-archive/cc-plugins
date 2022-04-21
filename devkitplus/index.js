import { persist } from "@cumcord/pluginData";

persist.ghost.apply ??= true;
persist.ghost.startupDev ??= true;
persist.ghost.disableCallbacks ??= true;

// no exports, these modules just do their thing and they do it in style.
import "./modules/startupDev";

// modules that unpatch
import api from "./api";
import callbacks from "./modules/callbacks";
import assign from "./modules/assign";

const modules = [api, callbacks, assign];

export const onUnload = () => _.forEachRight(modules, (p) => p?.());
