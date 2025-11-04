<script lang="ts">
	import '../app.css';
	import Navbar from '$components/Navbar.svelte';

	let { children } = $props();
</script>

<!-- <svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head> -->

<div class="container mx-auto max-w-6xl">
	<Navbar />
	{@render children()}
</div>
