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
import pl from '@/locales/pl.json'
import en from '@/locales/en.json'
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBi11RI0D7vpbJW4BCypNuzeTOEfdJLYsA",
  authDomain: "project-lecrut.firebaseapp.com",
  projectId: "project-lecrut",
  storageBucket: "project-lecrut.appspot.com",
  messagingSenderId: "300390925658",
  appId: "1:300390925658:web:575fb51aa097bc2cf8df63",
  measurementId: "G-GD2KV2SQEQ"
};
const map = initializeApp(firebaseConfig);
const analytics = getAnalytics(map);
const auth = getAuth()
export const db = getFirestore()
const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  }
})


const i18n = createI18n({
  mode: 'composition',
  legacy: false,
  locale: 'pl',
  fallbackLocale: 'en',
  messages: {
    pl,
    en
  }
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')

export {app, auth, analytics}