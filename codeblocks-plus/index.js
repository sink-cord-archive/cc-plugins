import patchCodeblocks from "./patches/codeblocks";
import styles from "./styles.sass";

export default () => {
    let patches = [patchCodeblocks(), styles()];

    return {
        onUnload: () => patches.reduceRight((_, unpatch) => unpatch?.(), null),
    };
};
