<script lang="ts">
	import '../app.css';
	import { Navbar, Footer }  from '$components';

	let { children } = $props();
</script>

<!-- <svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head> -->

<Navbar />

{@render children()}

<Footer />
