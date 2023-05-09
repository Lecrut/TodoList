<script setup lang="ts">
import { ref } from 'vue'
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { useRouter } from 'vue-router'
import { mdiGoogle } from '@mdi/js'

const email = ref('')
const password = ref('')
const router = useRouter()
const register = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      console.log('Successfully logged in!')
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
      console.log('Successfully logged with google account!')
      router.push('/dashboard')
    })
    .catch((error) => {
      console.log(error.message)
    })
}
</script>

<template>
  <div class="strona">
      <v-sheet width="500" class="mx-auto">
          <h1 style="text-align: center;">{{$t('SignUp')}}</h1>

          <main>
          <v-sheet>
              <v-form @submit.prevent >
                  <v-text-field
                      v-model="email"
                      :label="$t('LoginEmail')"
                      type="email"
                  ></v-text-field>

                  <v-text-field
                      v-model="password"
                      :label="$t('LoginPassword')"
                      type="password"
                      :hint="$t('LoginPasswordHint')"
                  ></v-text-field>

                  <v-btn block class="mt-2" color="info" @click="register">
                      {{$t('SignUp') }}</v-btn>

                  <v-btn block class="mt-2" color="info" :append-icon="mdiGoogle" @click="registerGoogle">
                      {{ $t('SignUpWith') }}</v-btn>

                  <v-btn block class="mt-2" color="error" @click="() => $router.push('/register')" >
                      {{ $t('NoAccount') }} </v-btn>
              </v-form>
          </v-sheet>
          </main>
      </v-sheet>
  </div>
</template>

