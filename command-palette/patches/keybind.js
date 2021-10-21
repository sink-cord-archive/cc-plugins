import openPalette from "../components/Palette.jsx";

export default (nest, defaultEntries) => {
    let keyHandler = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.which == 80) openPalette(null, nest, defaultEntries);
    };

    document.addEventListener("keyup", keyHandler);

    return () => {
        document.removeEventListener("keyup", keyHandler);
    };
};
