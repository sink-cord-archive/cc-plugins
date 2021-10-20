import { findByProps, findByDisplayName } from "@cumcord/modules/webpack";
import { useNest } from "@cumcord/utils";
import { ErrorBoundary } from "@cumcord/ui/components";
import PaletteItem from "./PaletteItem.jsx";

const useState = React.useState;
const { openModal } = findByProps("openModal");
const ModalComponents = findByProps("ModalCloseButton");
const Flex = findByDisplayName("Flex");
const Header = findByDisplayName("Header");

const Component = ({ e, nest, defaultEntries }) => {
    useNest(nest);
    let [state, setState] = useState({
        selected: 0,
        search: "",
    });

    const entries = defaultEntries.concat(nest.ghost.customEntries)

    const setSearch = (s) => setState({ selected: state.selected, search: s });
    const setIndex = (i) => setState({ selected: i, search: state.seach });

    const keyHandler = (k) => {
        switch (k.which) {
            case 38:
                if (state.selected > 0) setIndex(state.selected - 1);
                else setIndex(entries.length - 1);
                break;

            case 40:
                if (state.selected < entries.length - 1)
                    setIndex(state.selected + 1);
                else setIndex(0);
                break;

            case 13:
                e.onClose();
                entries[state.selected].action();
                break;

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
                    {entries.map((entry, index) => (
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

export default (nest, defaultEntries) => openModal((e) => <Component e={e} nest={nest} defaultEntries={defaultEntries} />);
