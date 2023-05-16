<script setup lang="ts">
import { ref } from 'vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { useRouter } from 'vue-router'
import { mdiGoogle } from '@mdi/js'

const email = ref('')
const password = ref('')
const router = useRouter()
const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      console.log('Successfully registered!')
      router.push('/dashboard')
    })
    .catch((error) => {
      console.log(error.message)
      alert(error.message)
    })
}

const registerGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then(() => {
      console.log('Successfully registered with google!')
      router.push('/dashboard')
    })
    .catch((error) => {
      console.log(error.message)
    })
}
</script>

<template>
  <div class="strona">
    <v-sheet max-width="500" class="mx-auto">
      <h1 style="text-align: center">{{ $t('CreateAccount') }}</h1>

      <main>
        <v-sheet>
          <v-form @submit.prevent>
            <v-text-field v-model="email" :label="$t('LoginEmail')" type="email"></v-text-field>

            <v-text-field
              v-model="password"
              :label="$t('LoginPassword')"
              type="password"
            ></v-text-field>

            <v-btn color="info" block class="mt-2" @click="register">{{ $t('Register') }}</v-btn>

            <v-btn color="info" block :append-icon="mdiGoogle" class="mt-2" @click="registerGoogle"
              >{{ $t('RegisterWith') }}
            </v-btn>
          </v-form>
        </v-sheet>
      </main>
    </v-sheet>
  </div>
</template>
