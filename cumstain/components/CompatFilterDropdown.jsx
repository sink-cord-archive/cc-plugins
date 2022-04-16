import { Select_parent } from "../WPMODULES";

export default ({ filterMode, setFilterMode }) => (
    <Select_parent.SingleSelect
        options={[
            { value: 0, label: "Show All" },
            { value: 1, label: "CC Only" },
            { value: 2, label: "BD Only" },
        ]}
        value={filterMode}
        onChange={setFilterMode}
        isDisabled={false}
        className="ysink_stain_dropdown"
    />
);
