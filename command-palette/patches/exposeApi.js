import { log } from "@cumcord/utils/logger"
import { entries as builtInEntries, builtInSource } from "../paletteEntries.js";
import { openPalette, openPalettePromisified } from "../components/Palette.jsx";
import {
    openTextEntry,
    openTextEntryPromise,
} from "../components/TextEntryPalette.jsx";

export default (nest) => {
    window.commandPalette = {
        openPalette: (prompt, entries) => {
            openPalette(prompt, null, entries);
        },

        openPaletteAsync: openPalettePromisified,

        openTextEntry: (prompt, finishAction) =>
            openTextEntry(prompt, finishAction),
        openTextEntryAsync: (prompt) => openTextEntryPromise(prompt),

        registerEntry(id, source, label, action, icon, condition) {
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
            let index = nest.ghost.customEntries.findIndex((e) => e.id == id);
            if (index != -1)
                throw `Register failed: Entry ID taken by entry from source ${nest.ghost.customEntries[index].source}`;

            nest.ghost.customEntries.push({
                id,
                source,
                label,
                action,
                icon,
                console
            });
        },

        unregisterEntry(id, source) {
            // make sure people supply all required items
            if (!id || id == "")
                throw "Unregister failed: Please supply an ID (string) to deregister";
            // asking for this is the barebones crappiest measure to stop you removing others' entries
            if (!source || source == "")
                throw "Unregister failed: Please identify your source (string)";

            let entries = nest.ghost.customEntries;
            let index = entries.findIndex((e) => e.id == id);
            if (index == -1)
                throw "Unregister failed: No entry with that ID could be found";

            if (entries[index].source != source)
                throw "Unregister failed: An entry with that ID was found, but was not from your source";

            let removedEntry = entries[index];
            entries.splice(index, 1);
            nest.store.customEntries = entries;
            return removedEntry;
        },

        unregisterSource(source) {
            let entries = nest.ghost.customEntries;
            let notSourceEntries = entries.filter((e) => e.source != source);
            if (notSourceEntries.length == entries.length)
                throw "Bulk unregister failed: No entries with that source were found";
            nest.store.customEntries = notSourceEntries;
        },

        getBuiltInEntries: () => builtInEntries,
        getAllCustomEntries: () => nest.ghost.customEntries,
        getCustomEntriesBySouce: (source) =>
            nest.ghost.customEntries.filter((e) => e.source == source),
        getCustomEntryById: (id) =>
            nest.ghost.customEntries.find((e) => e.id == id),
    };

    log("|| COMMAND PALETTE || Initialised window.commandPalette API");

    return () => {
        window.commandPalette = undefined;
        delete window.commandPalette;
        log("|| COMMAND PALETTE || Disposed window.commandPalette API");
    };
};