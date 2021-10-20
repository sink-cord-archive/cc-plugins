import { showToast } from "@cumcord/ui/toasts";
import openPalette from "../components/Palette.jsx"
import paletteEntries from "../paletteEntries.js"

let keyHandler = (e) => {
    if (!e.ctrlKey || !e.shiftKey || e.which != 80) return;

    openPalette(paletteEntries);
}

export default () => {
    document.addEventListener("keyup", keyHandler)

    return () => {
        document.removeEventListener("keyup", keyHandler)
    };
};
