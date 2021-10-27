export default ({ entry, selected, id, icon, finish, hover }) => {
    if (!icon) icon = "";
    let iconIsUrl = false;
    try {
        new URL(icon);
        iconIsUrl = true;
    } catch {}

    return (
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
            {iconIsUrl ? (
                <div className="ysink_palette_icon_container">
                    <img src={icon} />
                    </div>
            ) : (
                <span className="ysink_palette_icon">{icon}</span>
            )}
            <span className="ysink_palette_iconseparator" />
            {entry.label}

            <div style={{flex: 1}} />

            <span className="ysink_palette_source">{entry.source}</span>
        </div>
    );
};
