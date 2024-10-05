import { Responder, ResponderType, URLStore } from "#base";
import { getIncluedRoles, icon, res, sendTicketLog } from "#functions";
import { menus } from "#menus";
import { createLinkButton, createRow, findChannel, limitText } from "@magicyan/discord";
import { ChannelType, OverwriteData } from "discord.js";

new Responder({
    customId: "ticket/panel/open",
    type: ResponderType.Button, cache: "cached",
    async run(interaction) {
        const { client, member, guild } = interaction;

        const guildData = client.mainGuildData;
        const ticketParentId = guildData.parents?.tickets?.id??"";
        const ticketParent = findChannel(guild, ChannelType.GuildCategory).byId(ticketParentId);

        await interaction.reply(res.warning(`${icon.loadAnimated} Aguarde um momento...`));
        if (!ticketParent) {
            interaction.editReply(res.danger(`${icon.error} Este sistema não está configurado!`));
            return;
        }
        
        const ticketChannel = findChannel(guild)
        .inCategoryId(ticketParent.id)
        .byFilter(c => Boolean(c.topic?.includes(member.id)));

        if (ticketChannel) {
            const row = createRow(
                createLinkButton({ url: ticketChannel.url, label: "Acessar ticket"})
            );
            interaction.editReply(res.danger(`${icon.error} Vocẽ ja tem um tickert aberto`, {  components: [row] }));
            return;
        }

        const roles = getIncluedRoles(guildData.tickets?.roles, guild)
        const perms: OverwriteData[] = roles.map(roles => ({
            id: roles.id, allow: ["ViewChannel"]
        }));
        perms.push(
            { id: guild.id, deny: ["ViewChannel"], allow: ["SendMessages"] },
            { id: member.id, allow: ["ViewChannel"] },
        );

        guild.channels.create({
            name: `:ticket:-${limitText(member.user.username, 18)}`,
            parent: ticketParent,
            permissionOverwrites: perms,
            topic: member.id,
            type: ChannelType.GuildText
        })
        .then(channel => {
            const row = createRow(
                createLinkButton({ url: channel.url, label: "Acessar ticket" })
            );

            const urlStore = new URLStore();
            urlStore.set("ownerId", member.id);
            urlStore.set("ownerUsername", member.user.username);
            urlStore.set("createdAt", new Date().toString());

            channel.send(menus.tickets.control.main(member, urlStore));
            interaction.editReply(res.success(`${icon.checkAnimated} Ticket criado com sucesso! ${channel.url}`, { components: [row] }));
            sendTicketLog({
                color: "success", guild, executor: member,
                text: `:ticket: | Novo Ticket Aberto ${channel.url}`
            });
        })
        .catch(()=> {
            interaction.editReply(res.danger(`${icon.error} Não foi possivel criar o ticket`));
        });

    },
});