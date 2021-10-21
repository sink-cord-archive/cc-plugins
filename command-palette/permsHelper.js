import { findByProps } from "@cumcord/modules/webpack";
const { getGuildPermissions } = findByProps("getGuildPermissions");
const { getLastSelectedGuildId } = findByProps("getLastSelectedGuildId")

const can = (guildId, perm) => {
    let guildperms = getGuildPermissions({ id: guildId });
    if (guildperms && (guildperms & perm) !== 0) {
        return true;
    } else {
        return false;
    }
};

const canBan = () => can(getLastSelectedGuildId(), BigInt(4));
const canKick = () => can(getLastSelectedGuildId(), BigInt(2));

export default can;
export { can, canBan, canKick, getLastSelectedGuildId as getGuildId }