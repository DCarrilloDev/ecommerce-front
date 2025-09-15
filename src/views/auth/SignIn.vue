<template>
  <v-container class="py-12" max-width="400">
    <v-card>
      <v-card-title>Sign In</v-card-title>
      <v-card-text>
        <v-text-field v-model="email" label="Email" type="email" />
        <v-text-field v-model="password" label="Password" type="password" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="doLogin" block>Entrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const doLogin = async () => {
  await auth.login({ email: email.value, password: password.value })
  router.push((route.query.redirect as string) ?? '/dashboard')
}
</script>
