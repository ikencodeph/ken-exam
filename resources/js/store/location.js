import axios from 'axios';

// set states for location module
const state = () => ({
    categories:[],
    activeCategory:[],
    activeLocation:null,
    locationInfo:{},

    // initial values of location list as per requirement. Saved in state in case of source updates for flexibility
    locationList: [
        {text: "Tokyo", value:"Tokyo,JP"},
        {text: "Yokohama", value:"Yokohama,JP"},
        {text: "Kyoto", value:"Kyoto,JP"},
        {text: "Osaka", value:"Osaka,JP"},
        {text: "Sapporo", value:"Sapporo,JP"},
        {text: "Nagoya", value:"Nagoya,JP"},
    ],
  })

  // getters
  const getters = {
    // get the list of location categories
    getCategories: (state) => {
      return state.categories;
    },

    getActiveCategory: (state) =>{
        return state.activeCategory;
    },
    // get the value of the active location currently searched by the user
    getActiveLocation: (state) => {
        return state.activeLocation;
    },
    // location info of the active location
    getLocationInfo: (state) => {
        return state.locationInfo;
    },
  }

  // actions
  const actions = {
    loadCategories: ({ commit }, params) => {
      return new Promise((resolve, reject) => {
            axios.get('/api/location/categories', { params: params })
            .then(response => {
                if (response.status == 200){
                    commit('setCategories', { categories: response.data.response.categories });
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
    findLocation: ({ dispatch, commit, getters }, params) => {
        return new Promise((resolve, reject) => {
            params = {
                location: getters.getActiveLocation,
                activeCategory: getters.getActiveCategory
            };
            axios.get('/api/location/info', { params: params })
                .then(response => {
                    if (response.status == 200){
                        commit('setLocationInfo', { locationInfo: response.data});
                        dispatch('weather/loadWeatherInfo', [], {root: true});
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
    setCategories (state, { categories }) {
        state.categories = categories;
    },

    setActiveCategory (state, { category }) {
        state.activeCategory = category;
    },

    setActiveLocation (state, { location }) {
        state.activeLocation = location;
    },

    setLocationInfo (state, { locationInfo }) {
        state.locationInfo =locationInfo;
    },
  }

  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
