<script setup lang="ts">
import { ref } from 'vue'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import firebaseApp from '../firebase/firebaseInit'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const router = useRouter()

async function newAccount() {
  try {
    const response = await createUserWithEmailAndPassword(
      getAuth(),
      email.value,
      password.value
    )
    if (response.user) {
      router.push({ name: 'Dashboard' })
    }
  } catch (err) {
    const error = err as Error | FirebaseError
    console.log(error)
    alert(error.message)
  }
}
</script>

<template>
  <h1>Create Account</h1>
  <input v-model="email" type="text" placeholder="email" />
  <input v-model="password" type="password" placeholder="password" />
  <button @click="newAccount">Submit</button>
</template>

<style scoped></style>
