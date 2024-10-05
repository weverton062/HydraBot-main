import { URLStore } from "#base";
import { icon } from "#functions";
import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { StringSelectMenuBuilder } from "discord.js";

export function ticketStaffPanel(urlStore: URLStore){
    const embed = createEmbed({
        url: urlStore,
        color: settings.colors.danger,
        description: brBuilder(
            `# ${icon.global} Painel staff`,
            "Veja as opções abaixo:",
        )
    });

    const row = createRow(
        new StringSelectMenuBuilder({
            customId: "ticket/control/staff",
            placeholder: "Selecione o que deseja fazer",
            options: [
                { label: "notificar", value: "notify", 
                    emoji: icon.notify, 
                    description: "Enviar uma mensagem na dm do dono do ticket" },
                { label: "Adicionar membros", value: "add", 
                    emoji: icon.addUser,
                    description: "Adicionar membros ao ticket" },
                { label: "Remover membros", value: "remove",
                    emoji: icon.removeUser, 
                    description: "Remover membros do ticket" }
            ]
        })
        
    );

    return { ephemeral, embeds: [embed], components: [row] };

}