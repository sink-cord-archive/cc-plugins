import { findByDisplayName } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import { pop, pushToLive } from "../dataManager";

const cec = findByDisplayName("ChannelEditorContainer");

const handler = (e) => {
    if (e.key === "Backspace") pop();
    else pushToLive(e);
};

export default () =>
    after("render", cec.prototype, (_, ret) => (
        <div id="ysink_wpm_wrapper" onKeyUp={handler}>
            {ret}
        </div>
    ));
