import message from "./message";
import voice from "./voice";
import styles from "./styles.sass";
import members from "./members";

persist.ghost.vc ??= true;
persist.ghost.ml ??= true;
persist.ghost.msg ??= true;

const unpatches = [styles(), message, voice, members];

export const onUnload = () => _.forEachRight(unpatches, (p) => p());

export { default as settings } from "./Settings";
