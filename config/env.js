import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {
    PORT,
    NODE_ENV,
    SERVER_URL,
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRY,
    ARCJET_ENV,
    ARCJET_KEY,
    QSTASH_URL,
    QSTASH_TOKEN,
    EMAIL_USER,
    EMAIL_APP_PASSWORD
} = process.env;