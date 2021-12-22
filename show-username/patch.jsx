import { findByProps } from "@cumcord/modules/webpack"
import { after } from "@cumcord/patcher"

const frs = findByProps("FocusRingScope")

export default () => after("default", frs, (args, ret) => {
    debugger;
})