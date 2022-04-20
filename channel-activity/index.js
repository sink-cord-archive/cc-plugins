import { injectCSS } from "@cumcord/patcher";
import memberListPatch from "./memberListPatch";
import { icon, children } from "./WPMODULES";

const css = `.ysink_activity_image{height:2rem;border-radius:.3rem}.${icon}{display:none}.${children}{display:flex}`;

const patches = [injectCSS(css), memberListPatch];

export const onUnload = () => _.forEachRight(patches, p => p());
