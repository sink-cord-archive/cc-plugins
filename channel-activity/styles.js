import { findByProps } from "@cumcord/modules/webpack";
const { icon } = findByProps("icon", "textRuler");
const { children } = findByProps("nameAndDecorators");

import { injectCss } from "@cumcord/patcher";

export default () =>
    injectCss(`
.ysink_activity_image {
    height: 2rem;
    border-radius: .3rem;
}

/* remove redundant rich presence icon */
.${icon} { display: none; }

/* idk why but this looks nicer */
.${children} { display: flex; }
`);
