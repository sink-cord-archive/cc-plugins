import { showToast } from "@cumcord/ui/toasts";

let entries = [
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

export default entries.map((entry) => ({
    source: "builtin",
    id: entry.id,
    label: entry.label,
    action: entry.action,
}));
