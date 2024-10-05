import { URLStore } from "#base";
import { icon } from "#functions";
import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";

export function ticketClosePanel(urlStore: URLStore){
    const embed = createEmbed({
        url: urlStore,
        color: settings.colors.danger,
        description: brBuilder(
            "## Este é o final deste ticket",
            "Veja as opções abaixo",
            `- ${icon.messageBox} Transcrever canal`,
            `- ${icon.move} Mover canal`,
            `- ${icon.trash} Deletar canal`
        )
    });

    const row = createRow(
        new ButtonBuilder({
            customId: "ticket/control/transcript",
            style: ButtonStyle.Primary,
            label: "Transcrever", emoji: icon.messageBox,
        }),
        new ButtonBuilder({
            customId: "ticket/control/move",
            style: ButtonStyle.Secondary,
            label: "Mover", emoji: icon.move,
        }),
        new ButtonBuilder({
            customId: "ticket/control/delete",
            style: ButtonStyle.Danger,
            label: "Deletar", emoji: icon.trash,
        })
    );

    return { embeds: [embed], components: [row] };
}