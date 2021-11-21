import data from "@cumcord/pluginData";
import { injectCSS } from "@cumcord/patcher";

export default () => {
    const modify = injectCSS(data.persist.ghost.quickCSS);

    data.reloadCSS = () => modify(data.persist.ghost.quickCSS);

    return () => {
        modify();
        data.reloadCSS = undefined;
        delete data.reloadCSS;
    };
};
