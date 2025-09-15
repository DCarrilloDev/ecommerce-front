<template>
  <v-container class="py-12" max-width="480">
    <v-card>
      <v-card-title>Crear cuenta</v-card-title>
      <v-card-text>
        <v-text-field v-model="name" label="Nombre" />
        <v-text-field v-model="lastName" label="Apellido" />
        <v-text-field v-model="email" label="Email" type="email" />
        <v-text-field v-model="password" label="Password" type="password" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="doRegister" block>Registrarme</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
const name = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

const doRegister = async () => {
  await auth.register({ name: name.value, lastName: lastName.value, email: email.value, password: password.value })
  router.push('/auth/sign-in')
}
</script>
