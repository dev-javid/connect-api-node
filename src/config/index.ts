import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_DATABASE, SECRET_KEY, TOKEN_LIFETIME_IN_MINUTES, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
