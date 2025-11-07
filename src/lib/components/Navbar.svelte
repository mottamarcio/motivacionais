<script>
	import { Quote, LayoutGrid, ChevronDown } from '@lucide/svelte';
</script>

<nav class="relative flex items-center justify-between max-w-6xl mx-auto px-6 py-8">
	<div class="flex items-center mx-auto gap-2">
		<div class="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
			<Quote size={20} color="teal" />
		</div>
		<div class="text-2xl font-thin pb-1">Motivacionais</div>
	</div>
	<!-- <div>
		<button class="flex items-center gap-1">
			<LayoutGrid size={18} color="#333" />
			<span id="categories" class="pb-1">Categorias</span>
			<ChevronDown size={16} color="#333" />
		</button>
	</div> -->
</nav>

<style>
	/* Responsive */
	@media (max-width: 768px) {
        nav {
            padding: 16px;
        }

		#categories {
            display: none;
        }   
	}
</style>
