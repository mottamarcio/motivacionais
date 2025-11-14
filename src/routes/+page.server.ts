import { getCategories, getRandomPhrase } from '$lib/server/db/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Carrega TUDO do banco de dados no servidor
	const categories = await getCategories();

	// Busca a frase inicial de forma eficiente
	const randomPhrase = await getRandomPhrase('motivacao');

	// Envia os dados para o componente +page.svelte
	return {
		categories: categories,
		phrase: randomPhrase
	};
};
