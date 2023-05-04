<script lang="ts" setup>
  import { RouterLink, RouterView } from 'vue-router'
  import { ref } from "vue"
  const drawer = ref(false)
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

      <v-select 
          v-model="$i18n.locale"
          :label="$t('languageLabel')"
          :items="['pl', 'en']"
          :value="$i18n.locale"
          variant="solo">
      </v-select>
      </v-navigation-drawer>

      <v-main style="min-height: 65px;" ></v-main>
    </v-layout>
</v-card>

  <RouterView />
</template>
