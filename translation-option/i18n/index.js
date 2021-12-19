import en_US from "./en-US.json";
import ru from "./ru.json";

import { Messages, _chosenLocale } from "@cumcord/modules/common/i18n";

export default () => {
    if (_chosenLocale === "ru") {
        Object.assign(Messages, ru);
    } else {
        Object.assign(Messages, en_US);
    }

    return () => {
        for (const key in en_US) {
            Messages[key] = undefined;
            delete Messages[key];
        }
    };
};
