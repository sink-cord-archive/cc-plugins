import { showToast } from "@cumcord/ui/toasts";
import { findByProps } from "@cumcord/modules/webpack";
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");

class OutputManager {
    constructor(startID, settings) {
        this.settings = settings;
        this.startID = startID;
    }

    success(msg) {
        const button = {
            text: "OK",
            color: "green",
            size: "medium",
            look: "outlined",
        };

        if (this.settings.hideSuccessToasts) {
            return;
        }
        this._main(msg, "success", [button]);
    }

    error(msg, actions = []) {
        const buttons = [
            {
                text: "okay",
                color: "red",
                size: "medium",
                look: "outlined",
            },
            ...actions.map((action) => ({
                size: "medium",
                look: "outlined",
                ...action,
            })),
        ];

        this._main(msg, "danger", buttons);
    }

    _main(content, type, buttons) {
        showToast({
            title: content,
            className: `ysink_translation_${type}`,
            content: buttons.map((b) => (
                <Button className="ysink_translation_button" {...b}>
                    {b.text}
                </Button>
            )),
        });
    }
}

export default OutputManager;
