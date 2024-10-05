import type { Guild } from "discord.js";

export function getIncluedRoles(idList: string[] | undefined, guild: Guild){
    return guild.roles.cache.filter(r => idList?.includes(r.id));
}