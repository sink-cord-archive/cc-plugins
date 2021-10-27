import openPalette from "../components/Palette.jsx";

export default (nest, defaultEntries) => {
    let keyHandler = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.which == 80){
            let md = nest.ghost.doNotShowWelcome ? null
             : "🎉 Welcome to **Command Palette**! 🎉 Start typing to pick an item from the list," +
             "or visit the API Docs to start building custom actions at https://yellowsink.github.io/cc-plugins/palette-docs"
            openPalette(null, nest, defaultEntries, md);
            nest.store.doNotShowWelcome = true;
        }
    };

    document.addEventListener("keyup", keyHandler);

    return () => {
        document.removeEventListener("keyup", keyHandler);
    };
};
