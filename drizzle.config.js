import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'ep-snowy-hat-a4gbgpgb-pooler.us-east-1.aws.neon.tech',
    user: 'neondb_owner',
    password: 'npg_5rHeizAjV4Xq',
    database: 'ai-interview-mocker',
    ssl: true
  },
});