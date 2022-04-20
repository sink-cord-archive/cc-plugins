import cssInject from "./styles.css";
import bannerPatch from "./bannerPatch";

const patches = [cssInject(), bannerPatch];

export const onUnload = () => _.forEachRight(patches, p => p());
