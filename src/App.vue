<template>
  <v-app>
    <AppNav />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppNav from '@/components/AppNav.vue'
</script>
