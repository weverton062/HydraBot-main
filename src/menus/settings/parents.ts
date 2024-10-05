import { GuildSchema } from "#database";
import { formatedChannelMention, icon } from "#functions";
import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { ChannelSelectMenuBuilder, ChannelType, StringSelectMenuBuilder } from "discord.js";
import { settingsNav } from "./nav.js";

const options = [ 
    { emoji: icon.ticket, label: "Tickets", value: "tickets", description: "Categoria de tickets" },
] as const;


export function settingsParentsMenu(guildData: GuildSchema){
    const parents = guildData.parents??{};

    const display = options.map(({ emoji, label, value }) => `- ${emoji} ${label}: ${formatedChannelMention(parents[value]?.id, "`Não definido`")}`);
    const embed = createEmbed({
        color: settings.colors.primary,
        title: "Categorias",
        description: brBuilder(`# ${icon.settings} Configurar categorias`, display)
    });

    const row = createRow(
        new StringSelectMenuBuilder({
            customId: "settings/parents/select",
            placeholder: "Selecione a categoria que deseja",
            options: Array.from(options)
        })
    );

    const navRow = createRow(settingsNav.main);

    return { embeds: [embed], components: [row, navRow] };
}

export function settingsParentMenu(guildData: GuildSchema, selected: string){
    const parents = guildData.parents??{};

    const { emoji, label } = options.find(({ value }) => value === selected)!;

    const channelKey = selected as keyof typeof parents;

    const embed = createEmbed({
        color: settings.colors.warning,
        description: brBuilder(
            `${icon.reload} Alterar a categoria ${emoji} ${label}`,
            `Atual: ${formatedChannelMention(parents[channelKey]?.id, "`Não definido`")}`
        )
    });

    const row = createRow(
        new ChannelSelectMenuBuilder({
            customId: `settings/parent/${selected}`,
            placeholder: "Selecione a categoria que deseja definir",
            channelTypes: [ChannelType.GuildCategory]
        }));

    const navRow = createRow(
        settingsNav.back("parents"),
        settingsNav.main
    );

    return { embeds: [embed], components: [row, navRow] };
}