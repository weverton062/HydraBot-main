import { createEmbed, createRow } from "@magicyan/discord";
import {ButtonBuilder, ButtonStyle } from "discord.js";
import { settings } from "#settings";
import { icon } from "#functions";

export function ticketDeletePanel(){
    const embed =  createEmbed({
        color: settings.colors.warning,
        description: "Deseja mesmo deletar este ticket?",
    });
   const row = createRow(
      new ButtonBuilder({
         customId: "ticket/control/trashbin",
         label: "Confirmar", emoji: icon.trash,
         style: ButtonStyle.Danger
      })
    );

    return { ephemeral, embeds: [embed], components: [row] };
}