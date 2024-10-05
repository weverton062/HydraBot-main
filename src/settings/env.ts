import { z } from "zod";

const envSchema = z.object({
    BOT_TOKEN: z.string({ description: "Discord Bot Token is required" }).min(1),
    WEBHOOK_LOGS_URL: z.string().url().optional(),
    MONGO_URI: z.string({ description: "MongoDb URI is required" }).min(1),
    MAIN_GUILD_ID: z.string({ description: "Main guild id is required" }).min(1),
    GUILD_EMOJI_ID: z.string({ description: "Guild emoji id is required" }).min(1),
    // Env vars...
});

type EnvSchema = z.infer<typeof envSchema>;

export { envSchema, type EnvSchema };