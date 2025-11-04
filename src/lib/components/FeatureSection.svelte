<script>
    import { Sparkles, BicepsFlexed, Moon } from '@lucide/svelte';
</script>

<div class="grid md:grid-cols-3 gap-8 mb-20">
    <div class="text-center">
        <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-teal-100">
            <Sparkles size={30} color="teal"/>
        </div>
        <h3 class="text-xl font-medium mb-2">Inspiração Diária</h3>
        <p class="text-gray-600">Novas frases todos os dias para renovar sua energia</p>
    </div>
    <div class="text-center">
        <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-teal-100">
            <BicepsFlexed size={30} color="teal"/>
        </div>
        <h3 class="text-xl font-medium mb-2">Inspiração Diária</h3>
        <p class="text-gray-600">Novas frases todos os dias para renovar sua energia</p>
    </div>
    <div class="text-center">
        <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-teal-100">
            <Moon size={30} color="teal"/>
        </div>
        <h3 class="text-xl font-medium mb-2">Inspiração Diária</h3>
        <p class="text-gray-600">Novas frases todos os dias para renovar sua energia</p>
    </div>
</div>