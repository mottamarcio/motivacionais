import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import BetterSqlite3 from 'better-sqlite3';

console.log('Running migrations...');

const db = drizzle(new BetterSqlite3('motivacionais.db'));

try {
	migrate(db, { migrationsFolder: 'drizzle' });
	console.log('Migrations applied successfully!');
	process.exit(0);
} catch (err) {
	console.error('Error running migrations:', err);
	process.exit(1);
}
