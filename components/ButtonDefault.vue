<template>
  <button :class="['border font-normal rounded-2xl flex items-center justify-center gap-2',

    variant === 'primary' ? 'bg-royal-green-500 border-royal-green-400 hover:border-royal-green-100 text-royal-green-950' : '',
    variant === 'secondary' ? 'bg-woodsmoke-800 border-woodsmoke-700 hover:border-woodsmoke-600 hover:text-woodsmoke-400 text-woodsmoke-50' : '',
    variant === 'danger' ? 'bg-woodsmoke-800 border-woodsmoke-700 hover:border-woodsmoke-600 hover:text-carnation-500 text-carnation-400' : '',
    variant === 'ghost' ? 'underline decoration-1 border-0 text-woodsmoke-400 hover:text-woodsmoke-50' : '',


  size === 'default' ? 'px-6 py-2 text-md min-h-11' : '',
    size === 'xs' ? 'px-4 py-2 text-xs h-fit' : '',
  ]">

    <Trash2 v-if="withIcon && icon == 'trash'" size=16 />
    <Send v-if="withIcon && icon == 'send'" size=16 />
    <User v-if="withIcon && icon == 'user'" size=16 />
    <Pencil v-if="withIcon && icon == 'edit'" size=16 />
    <Save v-if="withIcon && icon == 'save'" size=16 />

    <span v-if="texto">{{ texto }}</span>

  </button>
</template>

<script setup>
import { Trash2, Send, User, Pencil, Save } from 'lucide-vue-next';

const props = defineProps({
  texto: String,
  withIcon: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'default',
  },
})

</script>