import { webpack } from "@cumcord/modules";

export default () => {
    Object.assign(window, webpack);

    return () => {
        for (const key in webpack) delete window[key];
    };
};
