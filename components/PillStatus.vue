<template>
  <div>
    <span class="rounded-full border px-3 py-1 text-xs font-light" :class="[
  status === 'Padrão' ? 'border-woodsmoke-400 text-woodsmoke-50' : '',
      status === 'Importante' ? 'border-carnation-400 text-carnation-100' : '',
      status === 'Fazendo' ? 'border-royal-blue-600 text-royal-blue-100' : '',
      status === 'Parado' ? 'border-woodsmoke-400 text-woodsmoke-50' : '',
      status === 'Finalizado' ? 'border-royal-green-600 text-royal-green-100' : '',
    ]">
      {{ status }}
    </span>

  </div>
</template>

<script setup>

const props = defineProps({
  status: String,
})

</script>
