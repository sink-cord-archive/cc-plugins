import cssInject from "./styles.css";
import commandPalette from "./commandPalette";
import bannerPatch from "./bannerPatch";

const patches = [cssInject(), commandPalette(), bannerPatch];

export const onUnload = () => _.forEachRight(patches, p => p());
