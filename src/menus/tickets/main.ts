import { icon } from "#functions";
import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, Guild } from "discord.js";

export function ticketMainPanel(guild: Guild){
    const embed = createEmbed({
        color: settings.colors.azoxo,
        description: brBuilder(
            "# Sistema de ticket",
            "Abra seu ticket clicando no botão abaixo",
            "",
            "Após isso forneça as informações para agilizar",
            "o seu atendimento! Então basta aguardar que",
            "nossa equipe irá atendê-lo(a)"
        ),
        footer: { text: guild.name,
            iconURL: guild.iconURL()
         }
    });

    const row = createRow(
        new ButtonBuilder({
            customId: "ticket/panel/open",
            style: ButtonStyle.Success,
            label: "Abrir ticket", emoji: icon.ticket,
        })
    );

    return { embeds: [embed], components: [row] };
}