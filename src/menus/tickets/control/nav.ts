import { icon } from "#functions";
import { ButtonBuilder, ButtonStyle } from "discord.js";

export const ticketNav = {
    staff: new ButtonBuilder({
        customId: "ticket/control/back",
        label: "Voltar",
        style: ButtonStyle.Danger,
        emoji: icon.arrowLeft,
    }),
    close: new ButtonBuilder({
        customId: "ticket/control/close",
        label: "Voltar",
        style: ButtonStyle.Danger,
        emoji: icon.arrowLeft,
    })
};