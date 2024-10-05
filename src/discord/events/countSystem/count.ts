import { Event } from "#base";
import { Guild } from "discord.js";

const CHANNEL_MEMBER_COUNT_ID = '1278439698548916256';
const GUILD_ID = process.env.MAIN_GUILD_ID

// Função para atualizar o nome do canal
async function updateChannelName(guild: Guild) {
    try {
        const channel = guild.channels.cache.get(CHANNEL_MEMBER_COUNT_ID);
        if (!channel) return console.error('Channel not found');

        const memberCount = guild.memberCount;
        const newChannelName = `⭐｜Members: - ${memberCount}`;
        
        await channel.setName(newChannelName);
        console.log(`Channel name updated to: ${newChannelName}`);
    } catch (error) {
        console.error('Error updating channel name:', error);
    }
}

new Event({
    name: "CountMembers",
    event: "guildMemberAdd",
    async run(member) {
        if (member.guild.id === GUILD_ID) {
            updateChannelName(member.guild);
        }
    }
})

new Event({
    name: "CountMembers",
    event: "guildMemberRemove",
    async run(member) {
        if (member.guild.id === GUILD_ID) {
            updateChannelName(member.guild);
        }
    }
})