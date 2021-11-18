import { persist } from "@cumcord/pluginData";
import { log } from "@cumcord/utils/logger";
import { entries as builtInEntries, builtInSource } from "../paletteEntries.js";
import { openPalette, openPalettePromisified } from "../components/Palette.jsx";
import {
    openTextEntry,
    openTextEntryPromise,
} from "../components/TextEntryPalette.jsx";

export default () => {
    window.commandPalette = {
        openPalette: (prompt, entries, markdown) => {
            openPalette(prompt, null, entries, markdown);
        },

        openPaletteAsync: openPalettePromisified,

        openTextEntry: (prompt, finishAction, markdown) =>
            openTextEntry(prompt, finishAction),
        openTextEntryAsync: openTextEntryPromise,

        registerEntry(source, id, label, icon, action, condition) {
            // make sure people supply all required items
            if (!id || id == "")
                throw "Register failed: Please supply an ID (string) for your entry";
            if (!source || source == "")
                throw "Register failed: Please identify a source (string) for your entry";
            if (!label || label == "")
                throw "Register failed: Please supply a label (string) for your entry";
            if (!action)
                throw "Register failed: Please supply an action (JS function) for your entry";
            // don't let people pretend to be built in!
            if (source == builtInSource)
                throw "Register failed: That source is reserved for built in entries";
            // don't let people take existing IDs
            if (builtInEntries.find((e) => e.id == id) != undefined)
                throw "Register failed: Entry ID taken by a built in entry";
            let index = persist.ghost.customEntries.findIndex((e) => e.id == id);
            if (index != -1)
                throw `Register failed: Entry ID taken by entry from source ${persist.ghost.customEntries[index].source}`;

            persist.ghost.customEntries.push({
                id,
                source,
                label,
                action,
                icon,
                console,
            });
        },

        unregisterEntry(source, id) {
            // make sure people supply all required items
            if (!id || id == "")
                throw "Unregister failed: Please supply an ID (string) to deregister";
            // asking for this is the barebones crappiest measure to stop you removing others' entries
            if (!source || source == "")
                throw "Unregister failed: Please identify your source (string)";

            let entries = persist.ghost.customEntries;
            let index = entries.findIndex((e) => e.id == id);
            if (index == -1)
                throw "Unregister failed: No entry with that ID could be found";

            if (entries[index].source != source)
                throw "Unregister failed: An entry with that ID was found, but was not from your source";

            let removedEntry = entries[index];
            entries.splice(index, 1);
            persist.store.customEntries = entries;
            return removedEntry;
        },

        unregisterSource(source) {
            let entries = persist.ghost.customEntries;
            let notSourceEntries = entries.filter((e) => e.source != source);
            if (notSourceEntries.length == entries.length) return undefined;
            persist.store.customEntries = notSourceEntries;
            return entries.filter((e) => e.source == source);
        },

        getEntries: () => builtInEntries.concat(persist.ghost.customEntries),
    };

    log("|| COMMAND PALETTE || Initialised window.commandPalette API");

    return () => {
        window.commandPalette = undefined;
        delete window.commandPalette;
        log("|| COMMAND PALETTE || Disposed window.commandPalette API");
    };
};
