import { Command } from "#base";
import { icon, res } from "#functions";
import { menus } from "#menus";
import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, codeBlock } from "discord.js";

new Command({
    name: "setup",
    description: "Comando de setup",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "tickets",
            description: "Fazer setup do sistema de tickets",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "canal",
                    description: "Canal aonde o painel sera enviado",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                    required
                }
            ]
               
        }
    ],
    async run(interaction){
        const { options, guild } = interaction;

        switch(options.getSubcommand(true)){
            case "tickets":{
                await interaction.deferReply({ephemeral});

                const channel = options.getChannel("canal", true, [ChannelType.GuildText]);

                channel.send(menus.tickets.main(guild))
                .then(message => {
                    interaction.editReply(res.success(`:white_check_mark: Painel enviado! ${message.url}`));
                })
                .catch(err => {
                    interaction.editReply(res.danger(`${icon.error} Não foi possivel enviar o painel ${codeBlock(err)}`));  
                });
                return;
            }
        }
    }
});