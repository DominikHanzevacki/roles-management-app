<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="flex justify-end gap-16 p-4 bg-teal-500">
      <RouterLink to="/" class="router-link">Roles</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
