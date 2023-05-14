<script lang="ts" setup>
  import { RouterLink, RouterView } from 'vue-router'
  import { onMounted ,ref } from "vue"
  import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
  import { useTasksStore } from './stores/tasks'
  import router from '@/router'
  const drawer = ref(false)
  const isLoggedIn = ref(false)

  onMounted(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        isLoggedIn.value = true
      } else {
        isLoggedIn.value = false
      }
    })
  })

  const handleSingOut = () => {
    signOut(getAuth()).then(() => {
      const store = useTasksStore()
      store.$dispose()
      router.push('/')
    })
  }
</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar
        color="info"
        prominent
      >
        <v-app-bar-nav-icon variant="tonal" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Menu</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-app-bar>

      <v-navigation-drawer 
        v-model="drawer"
        location="left"
        temporary
        color="grey-light">
      <v-list>
        <RouterLink to="/">
          <v-btn block color="info">
            {{$t('homePage')}}
          </v-btn>
        </RouterLink>
      </v-list>

      <v-list>
        <RouterLink to="/about">
          <v-btn block color="info">
            {{$t('about')}}
          </v-btn>
        </RouterLink>
      </v-list>

      <v-list v-if="isLoggedIn">
        <RouterLink to="/dashboard">
          <v-btn block color="info">
            {{ $t('dashboard') }}
          </v-btn>
        </RouterLink>
      </v-list>

      <v-list v-if="!isLoggedIn">
        <RouterLink to="/singin">
          <v-btn block color="info">
            {{$t('SignUp')}}
          </v-btn>
        </RouterLink>
      </v-list>

      <v-list v-if="!isLoggedIn">
        <RouterLink to="/register">
          <v-btn block color="info">
            {{$t('Register')}}
          </v-btn>
        </RouterLink>
      </v-list>

      <v-list v-if="isLoggedIn">
        <v-btn block class="mt-2" color="info" @click="handleSingOut">{{
          $t('SignOut')
        }}</v-btn>
      </v-list>
      
      <v-select 
          v-model="$i18n.locale"
          :label="$t('languageLabel')"
          :items="['Polski', 'English']"
          :value="$i18n.locale"
          variant="solo">
      </v-select>
      </v-navigation-drawer>

      <v-main style="min-height: 65px;" ></v-main>
    </v-layout>
</v-card>

  <RouterView />
</template>
