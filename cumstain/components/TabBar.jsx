import { FormDivider, FormText } from "../WPMODULES";

export default ({ items }) => {
    let [selected, setSelected] = React.useState(0);

    return (
        <div className="ysink_stain_tabbar_root">
            <div className="ysink_stain_tabbar">
                {items.map((item, index) => (
                    <button
                        className={
                            "ysink_stain_button" +
                            (index === selected ? " ysink_stain_selected" : "")
                        }
                        onClick={() => setSelected(index)}
                    >
                        <FormText>{item.text}</FormText>
                    </button>
                ))}
            </div>

            <FormDivider className="ysink_stain_divide" />

            <div className="ysink_stain_tabbar_content">
                {React.createElement(items[selected].component, {goTo: setSelected})}
            </div>
        </div>
    );
};
