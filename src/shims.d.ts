/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module 'vuetify'
declare module 'vuetify/lib/components/index.mjs'
declare module 'vuetify/lib/directives'

declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  const component: DefineComponent<{}, {}, any>
  export default component
}
