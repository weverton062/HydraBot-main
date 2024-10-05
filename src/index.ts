import { bootstrapApp } from "#base";
import { db } from "#database";
import { Player } from "discord-player";
import { YoutubeiExtractor } from "discord-player-youtubei";

const { MAIN_GUILD_ID, GUILD_EMOJI_ID } = process.env;

export const client = await bootstrapApp({ workdir: import.meta.dirname,
    commands: {
        guilds: [MAIN_GUILD_ID, GUILD_EMOJI_ID]
    },
    async whenReady(client) {
        const mainGuildData = await db.guilds.get(MAIN_GUILD_ID);
        Object.assign(client, { mainGuildData });

    },
    async beforeLoad(client) {
        const player = Player.singleton(Object(client), {
            ytdlOptions: {
                quality: "highestaudio",
                filter: "videoonly"
            }
        });
        player.extractors.register(YoutubeiExtractor, {});
        Object.assign(client, { player });
    },
 });
