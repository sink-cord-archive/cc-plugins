export default ({ entry, selected, id, icon, finish, hover }) => (
    <div
        className={
            selected
                ? "ysink_palette_item ysink_palette_selected"
                : "ysink_palette_item"
        }
        id={id}
        onClick={finish}
        onMouseOver={hover}
    >
        <span className="ysink_palette_icon">{icon ?? ""}</span>
        <span className="ysink_palette_iconseparator" />
        {entry.label}
        <span className="ysink_palette_source">{entry.source}</span>
    </div>
);
