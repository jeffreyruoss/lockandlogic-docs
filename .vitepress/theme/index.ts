import type { App } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import FeatureEstimator from './FeatureEstimator.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }: { app: App }) {
    app.component('FeatureEstimator', FeatureEstimator)
  },
}
