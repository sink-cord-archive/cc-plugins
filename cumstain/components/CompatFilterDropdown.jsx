import { findByDisplayName } from "@cumcord/modules/webpack";

const { SingleSelect } = findByDisplayName("Select", false);

export default ({ filterMode, setFilterMode }) => (
    <SingleSelect
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
