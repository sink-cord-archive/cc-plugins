import { findByProps, findByDisplayName } from "@cumcord/modules/webpack";
import { useNest } from "@cumcord/utils";
import { ErrorBoundary } from "@cumcord/ui/components";
import PaletteItem from "./PaletteItem.jsx";

const useState = React.useState;
const { openModal } = findByProps("openModal");
const ModalComponents = findByProps("ModalCloseButton");
const Flex = findByDisplayName("Flex");
const Header = findByDisplayName("Header");

const Component = ({ e, nest }) => {
    useNest(nest);
    let [state, setState] = useState({
        selected: 0,
        search: "",
    });

    const setSearch = (s) => setState({ selected: state.selected, search: s });
    const setIndex = (i) => setState({ selected: i, search: state.seach });

    const keyHandler = (e) => {
        switch (e.which) {
            case 38:
                if (state.selected > 0) setIndex(state.selected - 1);
                else setIndex(nest.ghost.entries.length - 1);
                break;

            case 40:
                if (state.selected < nest.ghost.entries.length - 1)
                    setIndex(state.selected + 1);
                else setIndex(0);

            default:
                break;
        }
    };

    return (
        <ErrorBoundary>
            <ModalComponents.ModalRoot
                transitionState={e.transitionState}
                size="small"
                className="ysink_palette_modal"
                onKeyUp={keyHandler}
            >
                <ModalComponents.ModalContent className="ysink_palette_palette">
                    {nest.ghost.entries.map((entry, index) => (
                        <PaletteItem
                            entry={entry}
                            selected={index == state.selected}
                        />
                    ))}
                </ModalComponents.ModalContent>
            </ModalComponents.ModalRoot>
        </ErrorBoundary>
    );
};

export default (nest) => openModal((e) => <Component e={e} nest={nest} />);
