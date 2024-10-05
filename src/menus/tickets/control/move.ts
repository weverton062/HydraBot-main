import { createRow } from "@magicyan/discord";
import {ChannelSelectMenuBuilder, ChannelType } from "discord.js";
import { ticketNav } from "./nav.js";

export function ticketMovePanel(){
   const row = createRow(
      new ChannelSelectMenuBuilder({
         customId: "ticket/control/move",
         placeholder: "Selecione uma categoria para mover",
         channelTypes: [ChannelType.GuildCategory]
      })
    );

    const navRow = createRow(ticketNav.close);

    return { ephemeral, components: [row, navRow] };
}