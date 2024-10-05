import { settingsChannelMenu, settingsChannelsMenu } from "./channels.js";
import { settingsMainMenu } from "./main.js";
import { settingsParentMenu, settingsParentsMenu } from "./parents.js";
import { settingsRolesAddMenu, settingsRolesMenu, settingsRolesRemoveMenu } from "./roles.js";

export const settingsMenus = {
    main: settingsMainMenu,
    channels: {
        main: settingsChannelsMenu,
        subMenu: settingsChannelMenu
    },
    parents: {
        main: settingsParentsMenu,
        subMenu: settingsParentMenu
    },
    roles: {
        main: settingsRolesMenu,
        add: settingsRolesAddMenu,
        remove: settingsRolesRemoveMenu
    }
};