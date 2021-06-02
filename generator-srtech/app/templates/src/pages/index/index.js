import Vue from 'vue'
import App from './App.vue'
import MGUtils from '@tp/h5utils'
// import store from '../../store'
import '../base'

// import Eruda from 'eruda'
// Eruda.init()

Vue.config.productionTip = false

new Vue({
  // store,
  render: h => h(App)
}).$mount('#app')


const bodyDom = document.querySelector('body')

if (window.Bulma) {
  let ac = bodyDom.getAttribute('mg-stat-page')

  Bulma.setConf(
    'pv',
    { url: location.href, ac, istc: 'pro', bid: '4.1.2', act: 'pv', uvip: 0, abroad: 0, ch: MGUtils.parseQuery().cxid || '90f76kbev' },
    ['//d-h5-v1.log.mgtv.com/dispatcher.do']
  )
  window.Bulma.log('pv');
}