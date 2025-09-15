<template>
  <v-app-bar app>
    <v-app-bar-title>Ecommerce</v-app-bar-title>
    <v-spacer />
    <v-btn to="/" variant="text">Home</v-btn>
    <v-btn to="/dashboard" variant="text">Dashboard</v-btn>
    <v-btn v-if="!isAuth" to="/auth/sign-in" variant="flat">Sign In</v-btn>
    <v-btn v-if="!isAuth" to="/auth/sign-up" variant="text">Sign Up</v-btn>
    <v-btn v-else @click="logout" variant="text">Logout</v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const { isAuthenticated: isAuth } = storeToRefs(auth)
const logout = () => auth.logout()
</script>
