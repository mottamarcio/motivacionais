<script lang="ts">
	import {
		HeroSection,
		CategoriesSection,
		PhraseCard,
		ActionButtons,
		FeatureSection
	} from '$components';

	// Receive data from +page.server.ts
	let { data } = $props();

	// ==== States (runes) ====
	let currentCategory = $state('motivacao');
	let currentPhrase = $state(data.phrase || 'Carregando frase...');
	let copying = $state(false);

	// ===== Categories =====
	const categories = data.categories || [];

	// ===== Generate New Phrase =====
	async function generateNewPhrase() {
		console.log(`Generating new phrase for category: ${currentCategory}`);
		try {
			const response = await fetch(`/api/phrase?category=${currentCategory}`);
			const data = await response.json();
			if (response.ok) {
				currentPhrase = data.phrase;
				console.log('New phrase fetched:', currentPhrase);
			} else {
				throw new Error(data.error || 'Failed to fetch phrase');
			}
		} catch (error) {
			console.error('Error fetching new phrase:', error);
			currentPhrase = 'Erro ao carregar frase. Tente novamente.';
		}
	}

	// ===== Select Category =====
	function selectCategory(categoryId: string) {
		if (categoryId === currentCategory) return; // No change
		console.log(`Category selected: ${categoryId}`);
		currentCategory = categoryId;
		if (Object.keys(categories).length > 0) generateNewPhrase();
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
