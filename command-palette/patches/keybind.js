import openPalette from "../components/Palette.jsx";

export default (nest) => {
    let keyHandler = (e) => {
        if (e.ctrlKey && e.shiftKey && e.which == 80) {
            openPalette(nest);
        }

        if (e.which == 38) nest.store.queued.splice(0, 0, "up");
        if (e.which == 40) nest.store.queued.splice(0, 0, "down");
    };

    document.addEventListener("keyup", keyHandler);

    return () => {
        document.removeEventListener("keyup", keyHandler);
    };
};
