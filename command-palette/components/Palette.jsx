import { findByProps } from "@cumcord/modules/webpack";
import { useNest } from "@cumcord/utils";
import { ErrorBoundary } from "@cumcord/ui/components";
import PaletteItem from "./PaletteItem.jsx";

const useState = React.useState;
const { openModal } = findByProps("openModal");

const Component = ({ e, nest }) => {
    useNest(nest);
    let [state, setState] = useState({
        selected: 0,
        search: "",
    });

    const setSearch = (s) => setState({ selected: state.selected, search: s });
    const setIndex = (i) => setState({ selected: i, search: state.seach });

    nest.ghost.queued.forEach((item) => {
        if (item == "up") {
            if (state.selected > 0) setIndex(state.selected - 1);
        }

        if (item == "down") {
            if (state.selected < nest.ghost.entries.length - 1)
                setIndex(state.selected + 1);
        }
    });
    nest.ghost.queued = [];

    return (
        <ErrorBoundary>
            <div className="ysink_palette_palette">
                {nest.ghost.entries.map((entry, index) => (
                    <PaletteItem
                        entry={entry}
                        selected={index == state.selected}
                    />
                ))}
            </div>
        </ErrorBoundary>
    );
};

export default (nest) => openModal((e) => <Component e={e} nest={nest} />);
