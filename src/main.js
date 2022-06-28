import Vue from 'vue'
// import Vuex from 'vuex'
import App from './App'
import Store from './components/TodosStore'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: Store,
  render: h => h(App)
})
