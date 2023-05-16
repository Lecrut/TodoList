<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'
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
  <v-app>
    <v-layout>
      <v-app-bar color="info" temporary>
        <v-app-bar-nav-icon variant="tonal" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Menu</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        location="left"
        temporary
        style="text-align: center"
        color="grey-light"
      >
        <v-list nav>
          <v-list-item color="info" to="/" :title="$t('homePage')"></v-list-item>

          <v-list-item color="info" to="/about" :title="$t('about')"></v-list-item>

          <v-list-item
            v-if="isLoggedIn"
            color="info"
            to="/dashboard"
            :title="$t('dashboard')"
          ></v-list-item>

          <v-list-item
            v-if="!isLoggedIn"
            color="info"
            to="/singin"
            :title="$t('SignUp')"
          ></v-list-item>

          <v-list-item
            v-if="!isLoggedIn"
            color="info"
            to="/register"
            :title="$t('Register')"
          ></v-list-item>

          <v-list-item
            v-if="isLoggedIn"
            color="info"
            :title="$t('SignOut')"
            @click="handleSingOut"
          ></v-list-item>

          <v-select
            v-model="$i18n.locale"
            :label="$t('languageLabel')"
            :items="['Polski', 'English']"
            :value="$i18n.locale"
            variant="solo"
          >
          </v-select>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <RouterView />
      </v-main>
    </v-layout>
  </v-app>
</template>
