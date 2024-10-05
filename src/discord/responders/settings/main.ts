import { Responder, ResponderType } from "#base";
import { menus } from "#menus";

new Responder({
    customId: "settings/:menu",
    type: ResponderType.Button, cache: "cached",
    async run(interaction, { menu }) {

        const { client, guild } = interaction;
        const guildData = client.mainGuildData;

        switch(menu){
            case "main": {
                interaction.update(menus.settings.main());
                return;
            }
            case "roles": {
                interaction.update(menus.settings.roles.main(guildData, guild));
                return;
            }
            case "channels": {
                interaction.update(menus.settings.channels.main(guildData));
                return;
            }
            case "parents": {
                interaction.update(menus.settings.parents.main(guildData));
                return;
            }
        }
    },
});