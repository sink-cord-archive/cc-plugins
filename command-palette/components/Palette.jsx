import { findByProps, findByDisplayName } from "@cumcord/modules/webpack";
import { ErrorBoundary } from "@cumcord/ui/components";
import PaletteItem from "./PaletteItem.jsx";
import PaletteMd from "./PaletteMd.jsx";
import search from "../search.js";
import showErrorModal from "./ErrorModal.jsx";

const useState = React.useState;
const { openModal } = findByProps("openModalLazy");
const ModalComponents = findByProps("ModalCloseButton");
const TextInput = findByDisplayName("TextInput");

const Component = ({
    e,
    prompt,
    nest,
    defaultEntries,
    closeAction,
    markdown,
}) => {
    let [state, setState] = useState({
        selected: 0,
        search: "",
    });

    let rawEntries = nest
        ? defaultEntries.concat(nest.ghost.customEntries)
        : defaultEntries;
    let usageMap = nest ? nest.ghost.usageCounts : new Map();

    const setSearch = (s) => {
        let selected = state.selected;
        setState({ selected, search: s });
    };
    const setIndex = (i) => {
        let search = state.search;
        setState({ selected: i, search });
    };

    let entries = [];
    try {
        entries = search(rawEntries, usageMap, state.search);
    } catch (err) {
        setSearch("");
        showErrorModal(err);
    }
    
    const finish = () => {
        // close modal
        e.onClose();
        // increment usages count (helps with ranking entries)
        let entry = entries[state.selected];
        if (nest) {
            let usages = nest.ghost.usageCounts;
            let currentUsage = usages.get(entry.id) ?? 0;
            usages.set(entry.id, currentUsage + 1);
            nest.store.usageCounts = usages;
        }
        // run entry action
        entry.action();
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
                finish();
                break;

            default:
                document
                    .getElementsByClassName("ysink_palette_input")[0]
                    .children[0].focus();
                break;
        }

        document
            .getElementById(`palette_item_${state.selected}`)
            ?.scrollIntoView(false);
    };

    if (e.transitionState == 3 && closeAction) closeAction();
    return (
        <ErrorBoundary>
            <ModalComponents.ModalRoot
                transitionState={e.transitionState}
                size="small"
                className="ysink_palette_modal"
                onKeyDown={keyHandler}
            >
                <ModalComponents.ModalContent className="ysink_palette_palette">
                    {!markdown ? [] : <PaletteMd>{markdown}</PaletteMd>}

                    <div className="ysink_palette_input_wrapper">
                        &gt;
                        <TextInput
                            className="ysink_palette_input"
                            placeholder={prompt ?? "Search Actions"}
                            type="text"
                            value={state.search}
                            onChange={(e) => setSearch(e)}
                        />
                    </div>

                    <div className="ysink_palette_scrollcontainer">
                        {entries
                            .filter(
                                (entry) =>
                                    entry && (entry.condition?.() ?? true)
                            )
                            .map((entry, index) => (
                                <PaletteItem
                                    entry={entry}
                                    id={`palette_item_${index}`}
                                    selected={index == state.selected}
                                    icon={entry.icon}
                                    hover={() => setIndex(index)}
                                    finish={finish}
                                />
                            ))}
                    </div>
                </ModalComponents.ModalContent>
            </ModalComponents.ModalRoot>
        </ErrorBoundary>
    );
};

let openPalette = (prompt, nest, defaultEntries, markdown, closeAction) =>
    openModal((e) => (
        <Component
            {...{ e, prompt, nest, defaultEntries, closeAction, markdown }}
        />
    ));

let openPalettePromisified = (prompt, entries, markdown) =>
    new Promise((resolve, reject) => {
        openPalette(
            prompt,
            null,
            entries.map((entry) => {
                return { label: entry, action: () => resolve(entry) };
            }),
            markdown,
            () => reject("user closed palette")
        );
    });

export default openPalette;
export { openPalette, openPalettePromisified };
