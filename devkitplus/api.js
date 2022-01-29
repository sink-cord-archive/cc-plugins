import * as cctools from "cumcord-tools";
import bestFindMethod from "./bestFindMethod";

import { findAll } from "@cumcord/modules/webpack";
import { injectCSS } from "@cumcord/patcher";

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

/* const compile = (scss, sass = false) =>
    new Promise((resolve) => {
        Sass.compile(scss, { indentedSyntax: sass }, (css) => resolve(css));
    });

const injectSCSS = async (scss, sass = false) => {
    const modifyRaw = injectCSS(await compile(scss, sass));
    return async (scss) =>
        scss ? modifyRaw(await compile(scss, sass)) : modifyRaw();
}; */

export default () => {
    window.dk = {
        cctools,
        bestFindMethod: bestFindMethod,
        findClassNameModuleAll,
        findClassNameModule: (className) =>
            findClassNameModuleAll(className)[0],
        /* injectSCSS: (scss) => injectSCSS(scss),
        injectSass: (sass) => injectSCSS(sass, true), */
    };

    return () => delete window.dk;
};
