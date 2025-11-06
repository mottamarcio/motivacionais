<script lang="ts">
	import { HeroSection, CategoriesSection, PhraseCard, ActionButtons, FeatureSection } from "$components";
	import { onMount } from "svelte";

	type Category = { id: string; name: string };
	type PhraseMap = { [key: string]: string[] };

	// ==== States (runes) ====
	let phraseMap = $state<PhraseMap>({});
	let currentCategory = $state('motivacao');
	let currentPhrase = $state('Carregando frase...');

	// ===== Categories =====
  const categories: Category[] = [
    { id: 'motivacao',       name: 'Motivação Diária' },
    { id: 'trabalho',        name: 'Trabalho & Sucesso' },
    { id: 'superacao',       name: 'Superação & Resiliência' },
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

	// ===== Fetch Phrases =====
	async function loadPhrases() {
		try {
			console.log('Loading phrases from JSON file...');
			const response = await fetch('/data/phrases.json');
			phraseMap = await response.json();
			console.log('Phrases loaded successfully:', phraseMap);
		} catch (error) {
			console.error('Error loading phrases:', error);
		}
	}

	// ===== Generate New Phrase =====
	function generateNewPhrase() {
		console.log(`Generating new phrase for category: ${currentCategory}`);
		const phrases = phraseMap[currentCategory] || [];
		if (phrases.length > 0) {
			const randomIndex = Math.floor(Math.random() * phrases.length);
			currentPhrase = phrases[randomIndex];
			console.log(`Generated new phrase for category: ${currentPhrase}`);
		} else {
			currentPhrase = 'Nenhuma frase disponível para esta categoria.';
		}
	}

	onMount(async () => {
		console.log('Component mounted...');
		await loadPhrases();
		generateNewPhrase();
	});
	
</script>

<main class="container mx-auto max-w-5xl px-6 py-12">
	<HeroSection />
	<CategoriesSection 
		{ categories }
		{ currentCategory }
	/>
	<PhraseCard 
		{ currentPhrase }
	/>
	<ActionButtons />
	<FeatureSection />
</main>
