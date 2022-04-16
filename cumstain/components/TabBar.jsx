import { FormDivider, FormText } from "../WPMODULES";

export default ({ items }) => {
    let [current, goTo] = React.useState(0);

    return (
        <div className="ysink_stain_tabbar_root">
            <div className="ysink_stain_tabbar">
                {items.map((e, i) => (
                    <button
                        className={
                            "ysink_stain_button" +
                            (i === current ? " ysink_stain_selected" : "")
                        }
                        onClick={() => goTo(i)}
                    >
                        <FormText>{e.text}</FormText>
                    </button>
                ))}
            </div>

            <FormDivider className="ysink_stain_divide" />

            <div className="ysink_stain_tabbar_content">
                {React.createElement(items[current].component, { goTo })}
            </div>
        </div>
    );
};
