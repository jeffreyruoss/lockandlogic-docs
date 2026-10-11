import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import StatTiles from './components/StatTiles.vue'
import BarList from './components/BarList.vue'
import RankJourney from './components/RankJourney.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // Chart pieces for the monthly reports (seo-reports.md)
    app.component('StatTiles', StatTiles)
    app.component('BarList', BarList)
    app.component('RankJourney', RankJourney)
  },
}
