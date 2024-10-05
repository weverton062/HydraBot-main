import { Responder, ResponderType, URLStore } from "#base";
import { icon, res, sendTicketLog } from "#functions";
import { menus } from "#menus";
import { settings } from "#settings";
import { brBuilder, createEmbed, createLinkButton, createRow, findMember } from "@magicyan/discord";
import { channelMention, GuildChannel } from "discord.js";

new Responder({
    customId: "ticket/control/:action",
    type: ResponderType.Select, cache: "cached",
    async run(interaction, { action }) {
        const { member, guild, values } = interaction;
        const  channel = interaction.channel as GuildChannel;

        const embed = createEmbed({ from: interaction });

        const urlStore = new URLStore(embed.data.url);

        const ticketOwner = findMember(guild).byId(urlStore.record.ownerId!);

        const [selected] = values;

        switch(action) {
            case "staff": {
                switch(selected){
                    case "notify": {
                        await interaction.update({});
                        if (!ticketOwner){
                            interaction.followUp(res.danger(`${icon.error} O dono do ticket não se encontra no servidor!`));
                            return;
                        }
                    
                        const embed = createEmbed({
                            color: settings.colors.warning,
                            thumbnail: guild.iconURL(),
                            description: brBuilder(
                                `# ${icon.notify} Você esta sendo notificado!`,
                                `${member} está chamando no seu ticket em ${channel.url}`
                            ),
                            footer: { text: guild.name, iconURL: guild.iconURL() }
                        });

                        const row = createRow(
                            createLinkButton({ url: channel.url, label: "Acessar ticket"})
                        );

                        ticketOwner.send({ embeds: [embed], components: [row] })
                        .then(() => {
                            interaction.followUp(res.success(`${icon.selection} Membro notificado com sucesso!`));
                            sendTicketLog({
                                color: "warning", guild, executor: member,
                                text: `Notificou o dono do ticket ${channel}`
                            });
                        })
                        .catch(() => {
                            interaction.followUp(res.danger(`${icon.error} Não foi possivel notificar o membro`));
                        });
                        return;
                    }
                    case "add": {
                        interaction.update(menus.tickets.control.add());
                        return;
                    }
                    case "remove": {
                        const members = guild.members.cache.filter(member => 
                            channel.permissionOverwrites.cache.has(member.id)
                        );
                        members.delete(urlStore.record.ownerId!);
                        if (members.size < 1) {
                            await interaction.update({});
                            interaction.followUp(res.danger(`${icon.error} Não há membros para remover deste canal`));
                            return;
                        }
                        interaction.update(menus.tickets.control.remove(members));
                        return;
                    }
                }
                return;
            }
            case "add": {
                for(const userId of values){
                    channel.permissionOverwrites.create(userId, { ViewChannel: true });
                }
                await interaction.update(menus.tickets.control.staff(urlStore));
                interaction.followUp(res.success(`${icon.selection} Membros adicionados com sucesso!`));

                sendTicketLog({
                    color: "warning", guild, executor: member,
                    text: `Adicionou membros ao ticket ${channel}`
                });
                return;
            }
            case "remove": {
                for(const userId of values){
                    channel.permissionOverwrites.delete(userId);
                }
                await interaction.update(menus.tickets.control.staff(urlStore));
                interaction.followUp(res.success(`${icon.selection} Membros removidos com sucesso!`));

                sendTicketLog({
                    color: "warning", guild, executor: member,
                    text: `Removeu membros do ticket ${channel}`
                });
                return;
            }
            case "move": {
                await interaction.update(menus.tickets.control.close(urlStore));
                channel.setParent(selected);
                interaction.followUp(res.success(`${icon.checkAnimated} Canal movido com sucesso!`));

                sendTicketLog({
                    color: "warning", guild, executor: member,
                    text: `Ticket ${channel} movido para o canal ${channelMention(selected)}`
                });
                return;
            }
        }
    }
});