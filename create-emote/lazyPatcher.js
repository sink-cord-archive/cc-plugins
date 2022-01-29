/*
 * patches the context menus lazily.
 * THIS CODE IS REFACTORED FROM
 * https://github.com/swishs-client-mod-plugins/cumcord-plugins/blob/5f81c10857b20741272a8d7b6becec3cc29f0520/plugins/pronoun-bio-scraper/apis/Patcher.js
 * -- sink
 */

// credits to juby and i think xinos
import { before } from "@cumcord/patcher";
import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";

const openContextMenuLazy = findByProps("openContextMenuLazy");

const patches = [];
export const registerPatch = (unpatch) => patches.push(unpatch);
export const unpatchAll = () => _.forEachRight(patches, (p) => p());

export function lazyPatchContextMenu(displayName, patch) {
    const module = findByDisplayName(displayName, false);

    // if the webpack module already exists, just patch it
    if (module) {
        patch(module);
        return;
    }

    // patch the module that lazily loads what we want
    let unpatchLazyPatch = before(
        "openContextMenuLazy",
        openContextMenuLazy,
        (args) => {
            // modify the lazy render to run the desired patch, and remove this one
            const lazyRender = args[1];
            args[1] = async () => {
                const render = await lazyRender(args[0]);

                return (config) => {
                    const menu = render(config);

                    if (menu?.type?.displayName === displayName && patch) {
                        unpatchLazyPatch();
                        patch(findByDisplayName(displayName, false));
                        patch = false;
                    }

                    return menu;
                };
            };
            return args;
        }
    );
}

export default { registerPatch, unpatchAll, lazyPatchContextMenu };
