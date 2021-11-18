import data from "@cumcord/pluginData";
import nests from "@cumcord/modules/internal/nests";

export default () => {
    data.unpatchCache = nests.make(new Map());
    return () => {
        data.unpatchCache = undefined;
        delete data.unpatchCache;
    };
};
