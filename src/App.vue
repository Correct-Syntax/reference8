<script setup>
import { RouterLink, RouterView } from 'vue-router';
import IconChevronRight from './components/icons/IconChevronRight.vue';
</script>

<template>
  <header class="absolute top-0 left-0 bg-dark-900 py-2 px-5 w-full">
    <nav class="relative flex flex-row items-center">
      <RouterLink to="/"><img alt="Ref logo" class="w-5 h-5" src="@/assets/logo-icon.svg" /></RouterLink>
      <IconChevronRight class="fill-neutral-400 w-2 h-2 mx-1.5" />
      <div class="text-neutral-300 text-sm">Reference Image</div>
    </nav>
  </header>
  <RouterView />
</template>