import cssInject from "./styles.sass";
import bannerPatch from "./bannerPatch";

const patches = [cssInject(), bannerPatch];

export const onUnload = () => _.forEachRight(patches, p => p());
