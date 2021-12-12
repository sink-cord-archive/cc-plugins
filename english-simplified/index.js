import { findByDisplayName } from "@cumcord/modules/webpack";
import { before } from "@cumcord/patcher";

export default () => {
    const unpatch = before(
        "default",
        findByDisplayName("RadioGroup", false),
        ([{ options }]) => {
            const ukIndex = options.findIndex((v) => v.value === "en-GB");
            const usIndex = options.findIndex((v) => v.value === "en-US");

            options[ukIndex].name.props.children[0].props.children =
                "English (Traditional)";
            options[ukIndex].name.props.children[1].props.children =
                "English (Traditional)";

            options[usIndex].name.props.children[0].props.children =
                "English (Simplified)";
            options[usIndex].name.props.children[1].props.children =
                "English (Simplified)";
        }
    );

    return {
        onUnload: unpatch,
    };
};
