import { icon } from "#functions";
import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";

export function settingsMainMenu(){
    const embed = createEmbed({
        color: settings.colors.primary,
        description: brBuilder(
            `# ${icon.settings} Configurações`,
            `- #️⃣ Definir canais`,
            "- 🔽 Definir categorias do servidor",
            "- 📄 Definir cargos de tickets"
        )
    });

    const row = createRow(
        new ButtonBuilder({
            customId: "settings/channels",
            label: "Canais", emoji: "#️⃣",
            style: ButtonStyle.Secondary
        }),
        new ButtonBuilder({
            customId: "settings/parents",
            label: "Categorias", emoji: "🔽",
            style: ButtonStyle.Secondary
        }),
        new ButtonBuilder({
            customId: "settings/roles",
            label: "Cargos de tickets", emoji: "📄",
            style: ButtonStyle.Secondary
        }),
    );

    return { ephemeral, embeds: [embed], components: [row]  };
}