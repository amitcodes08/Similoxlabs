import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';

let _db = null;

export function getDb() {
  if (!_db) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is not set in environment variables');
    }
    _db = drizzle(connectionString, { schema });
  }
  return _db;
}

export const db = process.env.DATABASE_URL
  ? drizzle(process.env.DATABASE_URL, { schema })
  : null;

export * from './schema.js';
