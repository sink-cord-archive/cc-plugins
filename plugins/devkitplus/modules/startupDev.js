import { persist } from "@cumcord/pluginData";
import dev from "@cumcord/dev";

if (persist.ghost.startupDev && dev?.isEnabled === false) dev.toggleDevMode();
