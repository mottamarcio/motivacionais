<script lang="ts">
    let { categories, currentCategory, onSelect }: { 
        categories: any[], 
        currentCategory: any, 
        onSelect: (categoryId: string) => void 
    } = $props();

    function btnClass(categoryId: string) {
        return categoryId === currentCategory 
            ? 'bg-teal-600 text-white px-4 py-2 rounded-full text-sm hover:bg-teal-700 transition' 
            : 'bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm hover:bg-teal-600 hover:text-white transition';
    }

</script>

<div class="flex flex-wrap justify-center gap-3 mb-12" id="categories">
    {#each categories as category}
        <button class={btnClass(category.id)} onclick={() => onSelect(category.id)}>
            {category.name}
        </button>
    {/each}
</div>