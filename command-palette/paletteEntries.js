import { showToast } from "@cumcord/ui/toasts";

export default [
    {
        label: "Not cum",
        action: () =>
            showToast({
                title: "You chose: Not cum",
                duration: 5000,
            }),
    },
    {
        label: "A bit cum",
        action: () =>
            showToast({
                title: "You chose: A bit cum",
                duration: 5000,
            }),
    },
    {
        label: "Cum",
        action: () =>
            showToast({
                title: "You chose: Cum",
                duration: 5000,
            }),
    },
];
