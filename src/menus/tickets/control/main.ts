import { URLStore } from "#base";
import { icon } from "#functions";
import { settings } from "#settings";
import { brBuilder, createEmbed, createEmbedAuthor, createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, GuildMember } from "discord.js";

export function ticketControlPanel(member: GuildMember, urlStore: URLStore) {
    const embed = createEmbed({
        url: urlStore,
        color: settings.colors.green,
        author: createEmbedAuthor(member, { prefix: "Ticket de "}),
        thumbnail: member.displayAvatarURL(),
        description: brBuilder(
            `Este é seu ticket ${member}`,
            ">>> Para acelerar o processo, envie mais detalhes",
            "sobre o assunto deste ticket e em breve",
            "nossa equipe irá atende-lo(a)"
        )
    });

    const row = createRow(
        new ButtonBuilder({
            customId: "ticket/control/staff",
            style: ButtonStyle.Primary,
            label: "Painel Staff",
            emoji: icon.global,
        }),
        new ButtonBuilder({
            customId: "ticket/control/close",
            style: ButtonStyle.Danger,
            label: "Fechar ticket",
            emoji: icon.close,
        })
    );

    return { embeds: [embed], components: [row] };

}