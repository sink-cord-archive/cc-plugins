import { findByProps } from "@cumcord/modules/webpack";
import PaletteItem from "./PaletteItem.jsx";

const useState = React.useState;
const { openModal } = findByProps("openModal");

const Component = ({ e, entries }) => {
    let [selected, setSelected] = useState(0);

    return (
        <div className="ysink_palette_palette">
            {entries.map((entry, index) => (
                <PaletteItem entry={entry} selected={index == selected} />
            ))}
        </div>
    );
};

export default (entries) => openModal((e) => <Component e={e} entries={entries} />);
