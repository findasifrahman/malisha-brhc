import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from './router'

import './styles.css'
import { applyBrhcTokensToRoot, BrhcToastProvider, vReveal } from '@brhc/ui'

applyBrhcTokensToRoot()

createApp(App)
  .use(createPinia())
  .use(router)
  .use(BrhcToastProvider)
  .directive('reveal', vReveal)
  .mount('#app')
