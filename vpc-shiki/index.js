export default () => {
    let patches = [];

    return {
        onUnload: () => patches.reduceRight((_, unpatch) => unpatch?.(), null),
    };
};
