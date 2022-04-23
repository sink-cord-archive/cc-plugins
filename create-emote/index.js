// huge credit to A User for the vizality original @ https://github.com/A-User-s-Discord-Plugins/emoji-util

import cssInject from "./styles.sass";
import patchContextMenu from "./patchContextMenu.jsx";
import patchEmotePicker from "./patchEmotePicker.jsx";

const patches = [cssInject(), patchContextMenu(), patchEmotePicker()];

export const onUnload = () => _.forEachRight(patches, (p) => p());
