import patch from "./patch";

export default () => {
    const unpatch = patch();

    return {
        onUnload: () => unpatch(),
    };
};
