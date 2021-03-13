import Vue from 'vue'
import Vuex from 'vuex'
import location from './location'
import weather from './weather'
import map from './map'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    location,
    weather,
    map
  },
  strict: debug,
})
