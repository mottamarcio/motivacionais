<script>
	let { currentPhrase } = $props();
</script>

<div
	id="phrase-card"
	class="relative rounded-3xl border p-12 md:p-16 mb-8 transition-all duration-100 ease-in-out bg-gradient-to-br from-gray-50 to-white"
>
	<p id="phrase" class="text-2xl md:text-3xl font-light leading-relaxed text-center retalive z-10">
		"{currentPhrase}"
	</p>
</div>
