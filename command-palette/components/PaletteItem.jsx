export default ({ entry, selected }) => (
    <div
        className={
            selected
                ? "ysink_palette_item ysink_palette_selected"
                : "ysink_palette_item"
        }
    >
        {entry.label}
    </div>
);
