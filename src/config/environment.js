/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import 'dotenv/config';

export const env = {
  AUTHOR: process.env.AUTHOR,
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  BUILD_MODE: process.env.BUILD_MODE,
  EMAIL_DOMAIN: process.env.EMAIL_DOMAIN,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  WHITELIST_DOMAINS: process.env.WHITELIST_DOMAINS ? process.env.WHITELIST_DOMAINS.split(',') : ''
};
