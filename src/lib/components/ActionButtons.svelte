<script>
    import { RefreshCcw, Copy, Share2 } from '@lucide/svelte';
</script>

<div class="flex flex-wrap justify-center gap-4 mt-6 mb-20">
    <button class="flex items-center gap-2 bg-gray-100 text-gray-800 px-6 py-3 font-medium rounded-full text-sm hover:bg-teal-600 hover:text-white transition">
        <RefreshCcw size={20}/>
        Nova frase
    </button>
    <button class="flex items-center gap-2 bg-gray-100 text-gray-800 px-6 py-3 font-medium rounded-full text-sm hover:bg-teal-600 hover:text-white transition">
        <Copy size={20}/>
        Copiar
    </button>
    <button class="flex items-center gap-2 bg-gray-100 text-gray-800 px-6 py-3 font-medium rounded-full text-sm hover:bg-teal-600 hover:text-white transition">
        <Share2 size={20}/>
        Compartilhar
    </button>
</div>