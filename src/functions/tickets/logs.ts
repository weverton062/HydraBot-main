import { settings } from "#settings";
import { createEmbed, findChannel } from "@magicyan/discord";
import { Guild, GuildMember } from "discord.js";

interface TicketLogOptins {
    color: keyof typeof settings.colors;
    text: string;
    executor: GuildMember;
    guild: Guild;
    title?: string;
};

export function sendTicketLog(options: TicketLogOptins){
    const { guild, text, color, title, executor } = options;

    const guildData = guild.client.mainGuildData;
    const channelId = guildData.channels?.logs?.id??"";
    const logsChannel = findChannel(guild).byId(channelId);
    if(!logsChannel) return;

    const embed = createEmbed({
        title, color: settings.colors[color],
        description: text,
        footer: {
            iconURL: executor.displayAvatarURL(),
            text: `Por ${executor.displayName}`
        }
    });
    
    logsChannel.send({ embeds: [embed] });

}