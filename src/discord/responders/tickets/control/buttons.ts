import { Responder, ResponderType, URLStore } from "#base";
import { getIncluedRoles, icon, res, sendTicketLog } from "#functions";
import { menus } from "#menus";
import { settings } from "#settings";
import { brBuilder, createEmbed, findChannel, findMember, sleep, toNull } from "@magicyan/discord";
import { createTranscript } from "discord-html-transcripts";
import { codeBlock, OverwriteType, TextChannel, time, userMention } from "discord.js";

new Responder({
    customId: "ticket/control/:action",
    type: ResponderType.Button, cache: "cached",
    async run(interaction, { action }) {
        const { member, guild, client } = interaction;
        const  channel = interaction.channel as TextChannel;

        const embed = createEmbed({ from: interaction });

        const urlStore = new URLStore(embed.data.url);

        const ticketOwner = findMember(guild).byId(urlStore.record.ownerId!);

        const guildData = client.mainGuildData;
        const allowedRoles = getIncluedRoles(guildData.tickets?.roles, guild);
       
        if(!member.roles.cache.some(r => allowedRoles.has(r.id))){
            interaction.reply(res.danger(`${icon.error} Você não tem permissão para fazer isso!`));
            return;
        }

        switch (action) {
            case "staff":{
                interaction.reply(menus.tickets.control.staff(urlStore));
                return;
            }
            case "back": {
                console.log("FSD")
                interaction.update(menus.tickets.control.staff(urlStore));
                return;
            }
            case "close":{
                interaction.update(menus.tickets.control.close(urlStore));

                const perms = channel.permissionOverwrites.cache.filter(perm => perm.type !== OverwriteType.Member);
                
                channel.permissionOverwrites.set(perms);
                return;
            }
            case "transcript": {
                const transcriptsChannelId = guildData.channels?.transcripts?.id??"";
                const transcriptsChannel = findChannel(guild).byId(transcriptsChannelId);
                if(!transcriptsChannel) {
                    interaction.reply(res.danger(`${icon.error} Canal de transcripts não encontrado!`));
                    return;
                }
                await interaction.reply(res.warning(`${icon.loadAnimated} Transcrevendo mensagens do canal! Aguarde...`));
                
                const attachment = await createTranscript(channel as never, {
                    limit: -1,
                    poweredBy: true,
                    filename: "ticket-transcript.html",
                    saveImages: true
                });

                const createdAt = new Date(urlStore.record.createdAt!);
                const transcriptAt = new Date();

                const embed = createEmbed({
                    color: settings.colors.primary,
                    description: brBuilder(
                        `Ticket de ${ticketOwner ?? "desconhecido"} **@${urlStore.record.ownerUsername}**`,
                        `Criado em ${time(createdAt, "F")}`,
                        `Transcrito em ${time(transcriptAt, "F")}`

                    )
                });

                transcriptsChannel.send({ embeds: [embed], files: [attachment]})
                .then(message => {
                    interaction.editReply(res.success(`${icon.checkAnimated} Mensagens transcrevidas com sucesso! ${message.url}`));
                    sendTicketLog({
                        color: "warning", guild, executor: member,
                        text: `Transcreveu o ticket ${channel.name} em ${transcriptsChannel}`
                    });
                })
                .catch(err => {
                    interaction.editReply(res.danger(`${icon.error} Não foi possível enviar a mensagem ${codeBlock(err)}`));
                });
                return;
            }
            case "move": {
                interaction.update(menus.tickets.control.move());
                return;
            }
            case "delete": {
                interaction.reply(menus.tickets.control.delete());
                return;
            }
            case "trashbin": {
                await interaction.update(res.danger(`${icon.loadAnimated} Este canal será deletado em breve! Aguarde...`, { components: [] } ));
                await sleep(4000);
                channel.delete().catch(toNull);

                sendTicketLog({
                    color: "danger", guild, executor: member,
                    text: `Ticket de ${userMention(channel.topic??"")} deletado`
                });

                return;
            }
        }
    },
});