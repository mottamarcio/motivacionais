import { drizzle } from 'drizzle-orm/better-sqlite3';
import BetterSqlite3 from 'better-sqlite3';
import * as schema from './schema';

const sqlite = new BetterSqlite3('motivacionais.db');
export const db = drizzle(sqlite, { schema });