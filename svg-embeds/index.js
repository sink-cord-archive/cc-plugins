import { findByDisplayName } from "@cumcord/modules/webpack";
import { before } from "@cumcord/patcher";

function transformUrl(url) {
    const testStr = "https://media.discordapp.net/attachments/";
    const replacement = "https://cdn.discordapp.com/attachments/";

    return url.startsWith(testStr)
        ? replacement + url.slice(testStr.length)
        : url;
}

function processAttachment(a) {
    if (a.content_type?.startsWith("image/svg+xml")) {
        /* 
            requirements to show image: (2022-03-22)
            - `width` and `height` > 0
            - `filename` ends in an accepted file ext (checked with regex) 
        */
        // TODO: Parse out the actual size of the svg?

        a.width = a.height = 1000;
        a.filename += ".png";

        // fix image display url
        a.proxy_url = transformUrl(a.proxy_url);
    }

    return a;
}

export const onUnload = before(
    "default",
    findByDisplayName("ConnectedMessageAccessories", false),
    (args) => {
        const msg = args[0].message;
        msg.attachments = msg.attachments.map(processAttachment);
        return args;
    }
);
