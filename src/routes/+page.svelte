<script lang="ts">
	import {
		HeroSection,
		CategoriesSection,
		PhraseCard,
		ActionButtons,
		FeatureSection
	} from '$components';
	import { onMount } from "svelte";

	// Receive data from +page.server.ts
	let { data } = $props();

	// ==== States (runes) ====
	let phraseMap = $state<{ [key: string]: string[] }>(data.phraseMap || {});
	let currentCategory = $state('motivacao');
	let currentPhrase = $state('Carregando frase...');
	let copying = $state(false);

	// ===== Categories =====
	const categories = data.categories || [];

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

	// ===== Select Category =====
	function selectCategory(categoryId: string) {
		if (categoryId === currentCategory) return; // No change
		console.log(`Category selected: ${categoryId}`);
		currentCategory = categoryId;
		if (Object.keys(phraseMap).length > 0) generateNewPhrase();
	}

	// ===== Copy Phrase to Clipboard =====
	async function handleCopyPhrase() {
		try {
			await navigator.clipboard.writeText(`"${currentPhrase}" - Motivacionais.com.br`);
			copying = true;
			setTimeout(() => (copying = false), 2000);
			console.log('Phrase copied to clipboard:', currentPhrase);
		} catch (error) {
			copying = false;
			console.error('Error copying phrase to clipboard:', error);
		}
	}

	function handleSharePhrase() {
		try {
			const text = encodeURIComponent(`"${currentPhrase}" - Motivacionais.com.br`);
			const url = `https://api.whatsapp.com/send?text=${text}`;
			window.open(url, '_blank');
		} catch (error) {
			console.error('Error sharing phrase:', error);
		}
	}

	onMount(() => {
		generateNewPhrase();
	});

</script>

<main class="container mx-auto max-w-5xl px-6 py-12">
	<HeroSection />
	<CategoriesSection {categories} {currentCategory} onSelect={selectCategory} />
	<PhraseCard {currentPhrase} />
	<ActionButtons
		onNew={generateNewPhrase}
		onCopy={handleCopyPhrase}
		onShare={handleSharePhrase}
		{copying}
	/>
	<FeatureSection />
</main>
