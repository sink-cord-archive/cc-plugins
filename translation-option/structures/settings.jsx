import EngineCard from "../components/EngineCard.jsx";
import { Messages } from "@cumcord/modules/common/i18n";

export default (Translator) => [
    {
        type: "tabBar",
        selected: "1",
        items: [
            {
                name: Messages.POWERCORD_GENERAL_SETTINGS,
                items: [],
            },
            {
                name: Messages.TRANSLATION_OPTION_ENGINE,
                items: Object.entries(Translator.infoEngines).map(
                    ([id, value]) =>
                        (props) =>
                            (
                                <EngineCard
                                    isInstalled={() =>
                                        Translator.engineIsInstalled(id)
                                    }
                                    onInstall={() =>
                                        Translator.installEngine(id)
                                    }
                                    product={{
                                        name: value.name,
                                        description: value.description,
                                        icon: value.icon,
                                        settings: value.settings,
                                    }}
                                    {...props}
                                />
                            )
                ),
            },
        ],
    },
];
