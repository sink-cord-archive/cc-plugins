import message from "./message";
import voice from "./voice";
import settings from "./Settings";
import styles from "./styles.sass";
import members from "./members";

export default () => {
    const unpatches = [styles(), message(), voice(), members()];

    return {
        onUnload: () => _.forEachRight(unpatches, (p) => p()),
        settings,
    };
};
