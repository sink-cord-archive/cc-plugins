import patch from "./patch";

export default () => {
    let patches = [patch()];

    return {
        onUnload: () => patches.reduceRight((_, unpatch) => unpatch?.(), null),
    };
};
