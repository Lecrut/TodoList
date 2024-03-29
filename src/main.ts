import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createI18n } from 'vue-i18n'
import '@fortawesome/fontawesome-free/css/all.css'
import { aliases, fa } from 'vuetify/iconsets/fa'
import Polski from '@/locales/pl.json'
import English from '@/locales/en.json'

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa
    }
  }
})

const i18n = createI18n({
  mode: 'composition',
  legacy: false,
  locale: 'Polski',
  fallbackLocale: 'English',
  messages: {
    Polski,
    English
  }
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')
