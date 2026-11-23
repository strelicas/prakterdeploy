import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });
config({ path: '.env' });

const isTurso = Boolean(process.env.TURSO_DATABASE_URL);

export default defineConfig(
  isTurso
    ? {
        schema: './db/schema.ts',
        out: './drizzle',
        dialect: 'turso',
        dbCredentials: {
          url: process.env.TURSO_DATABASE_URL!,
          authToken: process.env.TURSO_AUTH_TOKEN,
        },
      }
    : {
        schema: './db/schema.ts',
        out: './drizzle',
        dialect: 'sqlite',
        dbCredentials: {
          url: 'file:sqlite.db',
        },
      }
);
