import { GuildSchema } from "#database";
import { Player } from "discord-player";
import { HydratedDocument } from "mongoose";

declare module "discord.js" {
	interface Client {
		readonly mainGuildData: HydratedDocument<GuildSchema>,
		readonly player: Player;
	}
}