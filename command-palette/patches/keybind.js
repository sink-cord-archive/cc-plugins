import openPalette from "../components/Palette.jsx";

export default (nest) => {
    let keyHandler = (e) => {
        if (e.ctrlKey && e.shiftKey && e.which == 80) openPalette(nest);
    };

    document.addEventListener("keyup", keyHandler);

    return () => {
        document.removeEventListener("keyup", keyHandler);
    };
};
