import patchCodeblocks from "./patches/codeblocks";
import styles from "./styles.sass";
import Settings from "./Settings";
import theme from "./patches/theme";

export default () => {
    let patches = [styles(), theme(), patchCodeblocks()];

    return {
        onUnload: () => patches.reduceRight((_, unpatch) => unpatch?.(), null),
        settings: Settings,
    };
};
