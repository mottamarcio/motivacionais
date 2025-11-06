import { drizzle } from 'drizzle-orm/better-sqlite3';
import BetterSqlite3 from 'better-sqlite3';
import { categories, phrases } from './schema';
import fs from 'fs';

const categoryData = [
  { id: 'motivacao', name: 'Motivação Diária' },
  { id: 'trabalho', name: 'Trabalho & Sucesso' },
  { id: 'superacao', name: 'Superação & Resiliência' },
  { id: 'autoestima',      name: 'Autoestima & Confiança' },
  { id: 'foco',            name: 'Foco & Produtividade' },
  { id: 'quantico',        name: 'Pensamento Quântico' },
  { id: 'lideranca',       name: 'Liderança' },
  { id: 'espiritualidade', name: 'Espiritualidade' },
  { id: 'gratidao',        name: 'Gratidão' },
  { id: 'positividade',    name: 'Positividade' },
  { id: 'bom_dia',         name: 'Bom dia' },
  { id: 'humor',           name: 'Humor' }
];

// Carrega o JSON
const phraseMap = JSON.parse(fs.readFileSync('./static/data/phrases.json', 'utf-8'));

const db = drizzle(new BetterSqlite3('motivacionais.db'));

async function seed() {
  console.log('Iniciando o seeding...');

  // 1. Inserir Categorias
  console.log('Inserindo categorias...');
  await db.insert(categories).values(categoryData).onConflictDoNothing();

  // 2. Preparar Frases para inserção
  console.log('Preparando frases...');
  const allPhrases = [];
  for (const [categoryId, texts] of Object.entries(phraseMap)) {
    for (const text of (texts as string[])) {
      allPhrases.push({
        categoryId: categoryId,
        text: text,
      });
    }
  }

  // 3. Inserir Frases
  console.log(`Inserindo ${allPhrases.length} frases...`);
  // O Drizzle é inteligente e insere em "batches" (lotes)
  await db.insert(phrases).values(allPhrases).onConflictDoNothing();

  console.log('Seeding concluído com sucesso!');
}

seed();