# Command Palette API Docs

This documentation has type annotations for every function.

Command Palette exposes an API globally designed to make it as easy as possible to extend the palette,
and build custom pickers and text prompts.

It attaches an object to window: _`window.commandPalette`_,
and you can easily test for the existence of Command Palette in your plugin before you try to use it with the following:

```js
// yep, it's that easy
if (window.commandPalette) {
    // register custom entries etc
}
```

## The type used for entries

```ts
type entry = {
    id: string,
    label: string,
    source: string,
    // this field is optional!
    condition: () => bool,
    action: () => void,
};
```

The ID will be used to keep track of entries when working with the API and internally to rank results. They are unique.

The Label is the text for the entry to be shown in the palette.

The Source specifies where the entry came from.
It is recommended to use your plugin name or something recognisable, as this is shown to the user.

The condition is a function that will be run every time the palette is opened to check if the entry should be displayed or not.
If left undefined or null, then the entry will always render.

The action is a function that will be run whenever your action is picked.

## Note on custom entries

Custom entries, unless unregistered, are persistent between sessions.
Due to this, I recommend you call `unregisterSource` with your own source _before_ registering all your entries.

## `openPalette(prompt: string, entries: entry[]): void`

`openPalette` opens a completely custom palette supporting all features.

It takes a prompt that may be null to default to "Search Actions", and a list of possible entries.

## `openPaletteAsync(prompt: string, entries: string[]): Promise<string>`

`openPaletteAsync` opens a palette that behaves as a searchable picker panel, displaying the custom prompt, and allowing the user to pick a string.

The promise will be resolved once an item is picked, or rejected if the palette is closed.
If you are `await`ing the function, make sure to `try {} catch {}` in case the user closes the palette instead of picking.

## `openTextEntry(prompt: string, finishAction: (string) => void): void`

`openTextEntry` opens a text prompt, and if the user submits, will call `finishAction` with the entered text.

## `openTextEntryAsync(prompt: string): Promise<string>`

`openTextEntry` opens a text prompt.

The promise will be resolved once text is entered, or rejected if the textentry is closed.
If you are `await`ing the function, make sure to `try {} catch {}` in case the user closes the textentry instead of picking.

## `registerEntry(id: string, source: string, label: string, action: () => void): void`

`registerEntry` registers a custom entry into the default keybound command palette.

The ID must be unique, as it is used to keep track of entries.
The source will be shown to the user,
and it is highly recommended to use a recognisable name, like the name of your plugin.
The label is the text to be shown in the action list.
The action is a function to run if your entry is picked.

## `unregisterEntry(id: string, source: string): entry`

`unregisterEntry` will remove the entry of the specified ID and source, and then return the removed entry.

## `unregisterSource(source: string): void`

`unregisterSource` unregisters every entry connected to a given source.
This is very useful when you unpatch your function, to automatically remove all of your entries.

## `getBuiltInEntries(): entry[]`

Gets the built in entries. Yeah.

## `getAllCustomEntries(): entry[]`

Wanna spy on what entries other plugins are registering? There you go I guess.

## `getCustomEntriesBySource(source: string): entry[]`

Forgot your own entries? Get them again easily!
`getCustomEntriesBySource` returns every entry connected to a given source.

## `getCustomEntryById(id: string): entry`

`getCustomEntryById` gets an entry by it's ID.
