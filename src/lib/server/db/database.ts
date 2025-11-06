import { db } from '$lib/server/db';
import { categories, phrases, type Category } from '$lib/server/db/schema';
import { sql } from 'drizzle-orm';

// Exporta o tipo para o +page.server
export type { Category };
export type PhraseMap = { [key: string]: string[] };

/**
 * Busca todas as categorias.
 */
export async function getCategories(): Promise<Category[]> {
  return db.select().from(categories).orderBy(categories.name);
}

/**
 * Busca todas as frases e as retorna no formato de mapa
 */
export async function getPhraseMap(): Promise<PhraseMap> {
  const rows = await db.select({
    text: phrases.text,
    categoryId: phrases.categoryId
  }).from(phrases);

  const phraseMap: PhraseMap = {};
  for (const row of rows) {
    if (!phraseMap[row.categoryId]) {
      phraseMap[row.categoryId] = [];
    }
    phraseMap[row.categoryId].push(row.text);
  }
  return phraseMap;
}

/**
 * Busca uma frase aleatória (mais eficiente)
 * Agora podemos fazer isso direto no SQL!
 */
export async function getRandomPhrase(categoryId: string): Promise<string> {
    const result = await db.select({ text: phrases.text })
        .from(phrases)
        .where(sql`${phrases.categoryId} = ${categoryId}`)
        .orderBy(sql`RANDOM()`)
        .limit(1);

    if (result.length > 0) {
        return result[0].text;
    }
    return 'Nenhuma frase disponível para esta categoria.';
}