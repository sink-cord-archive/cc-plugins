import { findByProps } from "@cumcord/modules/webpack";
const { hex2int } = findByProps("hex2int");

const fixKey = (str) =>
    str.replace(/^raw/, "").charAt(0).toLowerCase() + str.slice(4);

function renameKey(key, newKey, obj) {
    Object.defineProperty(
        obj,
        newKey,
        Object.getOwnPropertyDescriptor(obj, key)
    );
    delete obj[key];
}

/**
 * Delete 'raw' prefix from keys
 * @param {Object} obj
 * @return {Object}
 */
function fixObject(obj) {
    if ("id" in obj) {
        delete obj.id;
    }
    if ("color" in obj && !isNaN(obj.color)) {
        obj.color = String(hex2int(obj.color));
    }
    Object.entries(obj).forEach(([key, value]) => {
        const newKey = key.startsWith("raw") ? fixKey(key) : null;
        if (newKey) {
            renameKey(key, newKey, obj);
        }
        if (key === "image" && obj.type !== "rich") {
            obj.image.proxy_url = value.proxyURL;
            renameKey("image", "thumbnail", obj);
        }
        if (Array.isArray(value)) {
            obj[newKey || key] = fixArrays(obj[newKey || key]);
        }
    });

    return obj;
}

const fixArrays = (arrays) => arrays.map((obj) => fixObject({ ...obj }));

export default fixArrays;
