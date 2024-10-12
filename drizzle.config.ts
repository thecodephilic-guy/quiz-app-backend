import dotenv from "dotenv";
import { defineConfig } from 'drizzle-kit';

dotenv.config({path: ".env"});

export default defineConfig({
  out: './drizzle',
  schema: './src/models',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});