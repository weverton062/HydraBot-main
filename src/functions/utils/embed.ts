import { settings } from "#settings";
import { createEmbed, EmbedPlusData } from "@magicyan/discord";

type SettingsColors = typeof settings.colors;
type ResFunction = <O>(text: string, options?: O & EmbedPlusData) => Exclude<O, EmbedPlusData>;
type Res = Record<keyof SettingsColors, ResFunction>;

export const res: Res = Object.create({}, Object.entries(settings.colors)
    .reduce((obj, [name, color]) => Object.assign(obj, {
        [name]: {
            enumerable: true, writable: false,
            value(description: string, options?: object){
                const data = Object.assign({ color, description }, options);
                const embed = createEmbed(data);

                if (options && "embeds" in options && Array.isArray(options.embeds)){
                    options.embeds.unshift(embed);
                }
                const defaults = { fetchReply: true, ephemeral:true, embeds: [embed] };
                return Object.assign(defaults, options);
            }
        }
    }), {} as PropertyDescriptorMap)
);