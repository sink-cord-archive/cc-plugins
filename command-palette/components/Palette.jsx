import { findByProps, findByDisplayName } from "@cumcord/modules/webpack";
import { useNest } from "@cumcord/utils";
import { ErrorBoundary } from "@cumcord/ui/components";
import PaletteItem from "./PaletteItem.jsx";
import search from "../search.js";

const useState = React.useState;
const { openModal } = findByProps("openModal");
const ModalComponents = findByProps("ModalCloseButton");
const Flex = findByDisplayName("Flex");
const Header = findByDisplayName("Header");
const TextInput = findByDisplayName("TextInput");

const Component = ({ e, nest, defaultEntries }) => {
    useNest(nest);
    let [state, setState] = useState({
        selected: 0,
        search: "",
    });

    const entries = search(
        defaultEntries.concat(nest.ghost.customEntries),
        nest.ghost.usageCounts,
        state.search
    );

    console.log(nest.ghost, defaultEntries, entries, state);

    const setSearch = (s) => {
        let selected = state.selected;
        setState({ selected, search: s });
    };
    const setIndex = (i) => {
        let search = state.search;
        setState({ selected: i, search });
    };

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
                // close modal
                e.onClose();
                // increment usages count (helps with ranking entries)
                let entry = entries[state.selected];
                let usages = nest.ghost.usageCounts;
                let currentUsage = usages.get(entry.id) ?? 0;
                usages.set(entry.id, currentUsage + 1);
                nest.store.usageCounts = usages;
                // run entry action
                entry.action();

                break;

            default:
                document
                    .getElementsByClassName("ysink_palette_input")[0]
                    .children[0].focus();
                break;
        }
    };

    return (
        <ErrorBoundary>
            <ModalComponents.ModalRoot
                transitionState={e.transitionState}
                size="small"
                className="ysink_palette_modal"
                onKeyDown={keyHandler}
            >
                <ModalComponents.ModalContent className="ysink_palette_palette">
                    <div className="ysink_palette_input_wrapper">
                        &gt;
                        <TextInput
                        className="ysink_palette_input"
                        placeholder="Search Actions"
                        type="text"
                        value={state.search}
                        onChange={(e) => setSearch(e)}
                    />
                    </div>

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

export default (nest, defaultEntries) =>
    openModal((e) => (
        <Component e={e} nest={nest} defaultEntries={defaultEntries} />
    ));
