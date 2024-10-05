
import { ActivityType, Client } from "discord.js";

export function setSongStatus(client: Client<true>, track: "Musica"){
    client.user.setActivity({
        name: track,
        type: ActivityType.Listening
    })
}