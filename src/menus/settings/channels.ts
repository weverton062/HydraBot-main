import { GuildSchema } from "#database";
import { formatedChannelMention, icon } from "#functions";
import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { ChannelSelectMenuBuilder, ChannelType, StringSelectMenuBuilder } from "discord.js";
import { settingsNav } from "./nav.js";

const options = [ 
    { emoji: icon.log, label: "Logs", value: "logs", description: "Canal de logs" },
    { emoji: icon.messageBox, label: "Transcripts", value: "transcripts", description: "Canal de transcripts" },
] as const;


export function settingsChannelsMenu(guildData: GuildSchema){
    const channels = guildData.channels??{};

    const display = options.map(({ emoji, label, value }) => `- ${emoji} ${label}: ${formatedChannelMention(channels[value]?.id, "`Não definido`")}`);
    const embed = createEmbed({
        color: settings.colors.primary,
        title: "Canais",
        description: brBuilder(`# ${icon.settings} Configurar canais`, display)
    });

    const row = createRow(
        new StringSelectMenuBuilder({
            customId: "settings/channels/select",
            placeholder: "Selecione o canal que deseja",
            options: Array.from(options)
        })
    );

    const navRow = createRow(settingsNav.main);

    return { embeds: [embed], components: [row, navRow] };
}

export function settingsChannelMenu(guildData: GuildSchema, selected: string){
    const channels = guildData.channels??{};

    const { emoji, label } = options.find(({ value }) => value === selected)!;

    const channelKey = selected as keyof typeof channels;

    const embed = createEmbed({
        color: settings.colors.warning,
        description: brBuilder(
            `${icon.reload} Alterar o canal ${emoji} ${label}`,
            `Atual: ${formatedChannelMention(channels[channelKey]?.id, "`Não definido`")}`
        )
    });

    const row = createRow(
        new ChannelSelectMenuBuilder({
            customId: `settings/channel/${selected}`,
            placeholder: "Selecione o canal que deseja definir",
            channelTypes: [ChannelType.GuildText]
        }));

    const navRow = createRow(
        settingsNav.back("channels"),
        settingsNav.main
    );

    return { embeds: [embed], components: [row, navRow] };
}