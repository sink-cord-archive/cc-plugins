import data from "@cumcord/pluginData";
import nests from "@cumcord/modules/internal/nests";

export default () => {
    data.state = nests.make({unpatchCache: new Map()});
    return () => {
        data.state = undefined;
        delete data.state;
    };
};
