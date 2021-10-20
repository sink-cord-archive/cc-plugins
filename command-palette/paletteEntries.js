import { showToast } from "@cumcord/ui/toasts";

const source = "Built In";

const entries = [
    {
        id: "notcum",
        label: "Not cum",
        action: () =>
            showToast({
                title: "You chose: Not cum",
                duration: 5000,
            }),
    },
    {
        id: "abitcum",
        label: "A bit cum",
        action: () =>
            showToast({
                title: "You chose: A bit cum",
                duration: 5000,
            }),
    },
    {
        id: "cum",
        label: "Cum",
        action: () =>
            showToast({
                title: "You chose: Cum",
                duration: 5000,
            }),
    },
];

// save me writing "Built In" for every single entry
const entriesWithSource = entries.map((entry) => ({
    source: source,
    id: entry.id,
    label: entry.label,
    action: entry.action,
}));

export default entriesWithSource;

export { entriesWithSource as entries, source as builtInSource }