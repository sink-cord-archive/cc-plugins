import moderation from "./builtInEntries/moderation.js"
import cumcord from "./builtInEntries/cumcord.js"

const source = "Built In";

const entries =
    moderation
        .concat(cumcord);

export default entries;

export { entries, source as builtInSource }