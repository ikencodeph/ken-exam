import axios from 'axios';

// set states for weather module
const state = () => ({
    weatherInfo:{},
  })

  // getters
  const getters = {
    // get weather info of the current active location
    getWeatherInfo: (state) => {
      return state.weatherInfo;
    },
  }

  // actions
  const actions = {
    loadWeatherInfo: ({ commit , rootState}) => {
      return new Promise((resolve, reject) => {
            let params = {location: rootState.location.activeLocation}
            axios.get('/api/weather', { params: params })
            .then(response => {
                if (response.status == 200){
                    console.log(response);
                    commit('setWeatherInfo', { weatherInfo: response.data });
                    resolve();
                } else{
                    reject;
                }
            })
            .catch(error => {
                reject;
            })
        })
    },
  }

  // mutations
  const mutations = {
    setWeatherInfo (state, { weatherInfo }) {
        state.weatherInfo = weatherInfo;
    },
  }

  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
