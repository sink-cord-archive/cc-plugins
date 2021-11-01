import cssInject from "./styles.css";
import { findByProps, findByDisplayName } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import { SwitchButtonArray, SwitchButton } from "./SwitchButtonArray.jsx";
import commandPalette from "./commandPalette.js";

export default (data) => {
    let patches = [];

    return {
        onLoad() {
            patches.push(cssInject(), commandPalette());

            let currentHouseBanner =
                findByDisplayName("JoinHypeSquadCTA").prototype;

            patches.push(
                after("render", currentHouseBanner, (_, retVal) => {
                    let inSquadValid = retVal?.props?.children?.props?.children;
                    let notInSquadValid =
                        retVal?.props?.children?.[0]?.props?.children?.[1]
                            ?.props?.children?.props?.children;

                    if (inSquadValid) {
                        retVal.props.children.props.children.push(
                            <SwitchButtonArray />
                        );
                        return retVal;
                    }

                    if (notInSquadValid) {
                        retVal.props.children[0].props.children[1].props.children =
                            [
                                retVal.props.children[0].props.children[1].props
                                    .children,
                            ];

                        retVal.props.children[0].props.children[1].props.children[0].props.children =
                            "Take HypeSquad test";

                        retVal.props.children[0].props.children[1].props.children.push(
                            <div className="ysink_hypesquad_container ysink_new">
                                {[1, 2, 3].map((n) => (
                                    <SwitchButton houseNum={n} />
                                ))}
                            </div>
                        );

                        return retVal;
                    }
                })
            );
        },

        onUnload: () => patches.forEach((unpatch) => unpatch()),
    };
};
