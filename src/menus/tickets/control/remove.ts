import { createRow } from "@magicyan/discord";
import { GuildMember, Collection, StringSelectMenuBuilder } from "discord.js";
import { ticketNav } from "./nav.js";
import { icon } from "#functions";

export function ticketRemovePanel(members: Collection<string, GuildMember>){
    const row = createRow(
        new StringSelectMenuBuilder({
            customId: "ticket/control/remove",
            placeholder: "Selecione os membros que deseja remover",
            minValues: 1, maxValues: Math.min(25, members.size),
            options: members.map(member => ({
                label: member.displayName,
                value: member.id, emoji: icon.user,
                description: `Remover ${member.user.username}`
            }))
        })
    );

    const navRow = createRow(ticketNav.staff);
    return { components: [row, navRow] };
}