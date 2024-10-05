import { Command } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType, AttachmentBuilder } from "discord.js";

new Command({
    name: "emojis",
    description: "Exibe uma lista de emojis",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "origem",
            description: "Origem dos emojis",
            type: ApplicationCommandOptionType.String,
            choices: [
                { name: "servidor", value: "guild"},
                { name: "bot", value: "client"}
            ]
        }
    ],
    async run(interaction){
        const { options } = interaction;

        const source = (options.getString("origem") ?? "guild") as "client" | "guild";
        const emojis = interaction[source].emojis.cache;
        const [animatedEmojis, staticEmojis] = emojis.partition(e => !!e.animated);
        const json = { 
            animated: animatedEmojis.reduce(
                (obj, { id, name }) => Object.assign(obj, { [name??id]: id }), {}
            ),
            static: staticEmojis.reduce(
                (obj, { id, name }) => Object.assign(obj, { [name??id]: id }), {}
            ),
        };

        const buffer = Buffer.from(JSON.stringify(json, null, 2));
        const attachment = new AttachmentBuilder(buffer, { name: "emojis.json" });

        interaction.reply({ ephemeral, content: "Lista de emojis", files: [attachment] });
    }
});