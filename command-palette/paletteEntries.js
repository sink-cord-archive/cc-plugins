import moderation from "./builtInEntries/moderation.js";
import cumcord from "./builtInEntries/cumcord.js";
import reboots from "./builtInEntries/reboots.js";
import navigation from "./builtInEntries/navigation.js";

const source = "Built In";

const entries = moderation.concat(cumcord).concat(reboots).concat(navigation);

export default entries;

export { entries, source as builtInSource };
