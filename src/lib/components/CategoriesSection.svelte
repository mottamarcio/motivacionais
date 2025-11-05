<script>
    const categories = [
        'Motivação Diária',
        "Trabalho & Sucesso",
        "Superação & Resiliência",
        "Autoestima & Confiança",
        "Foco & Produtividade",
        "Pensamento Quântico",
        "Liderança",
        "Espiritualidade",
        "Gratidão",
        "Positividade",
        "Bom dia",
        "Humor"
    ];
</script>

<div class="flex flex-wrap justify-center gap-3 mb-12" id="categories">
    {#each categories as category}
        <button class="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm hover:bg-teal-600 hover:text-white transition">
            {category}
        </button>
    {/each}
</div>