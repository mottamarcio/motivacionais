import { getCategories, getPhraseMap, getRandomPhrase } from '$lib/server/db/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Carrega TUDO do banco de dados no servidor
	const categories = await getCategories();
	
    // O phraseMap ainda é necessário para a lógica de 'generateNewPhrase' no cliente
    // (para evitar uma chamada de rede a cada clique)
	const phraseMap = await getPhraseMap();

	// Busca a frase inicial de forma eficiente
	const initialPhrase = await getRandomPhrase('motivacao');

	// Envia os dados para o componente +page.svelte
	return {
		categories: categories,
		phraseMap: phraseMap,
		initialPhrase: initialPhrase
	};
};