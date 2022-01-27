import * as cctools from "cumcord-tools";

import { findAll } from "@cumcord/modules/webpack";

const findClassNameModuleAll = (className) => {
    if (className.startsWith(".")) className = className.substring(1);
    return findAll(
        (m) =>
            typeof m === "object" &&
            Object.values(m).some(
                (p) => typeof p === "string" && p.includes(className)
            )
    );
};

export default () => {
    window.dk = {
        cctools,
        findClassNameModuleAll,
        findClassNameModule: (className) => findClassNameModuleAll(className)[0],
    };

    return () => delete window.dk;
};
