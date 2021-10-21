export default ({ entry, selected, id }) => (
    <div
        className={
            selected
                ? "ysink_palette_item ysink_palette_selected"
                : "ysink_palette_item"
        }
        id={id}
    >
        {entry.label}
        <span className="ysink_palette_source">{entry.source}</span>
    </div>
);
