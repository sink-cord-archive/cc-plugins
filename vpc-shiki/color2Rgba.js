// screw the BS color2Rgba.min.js was doing in the original, I like this :)

import parse from "color-parse";

const CssVarRegex = /var\((--.*)\)/;

export default (color) => {
    let resolvedColor = color;

    if (CssVarRegex.test(color)) {
        let cssVarName = color.replace(CssVarRegex, "$1");
        resolvedColor = getComputedStyle(
            document.documentElement
        ).getPropertyValue(cssVarName);
    }

    return parse(resolvedColor).values;
};
