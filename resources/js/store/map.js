import axios from 'axios';

// set states for weather module
const state = () => ({
    viewMap:true, // show map initially
    locationCenter:{}, // map center focus
    markers:[], // marker points
    showMarker:true // show/hide markers
  })

  // getters
  const getters = {
    // get view map settings
    getViewMap: (state) => {
      return state.viewMap;
    },
    // get map center LngLat
    getLocationCenter: (state) => {
      return state.locationCenter;
    },
    // get marker pointers
    getMarkers: (state) => {
        return state.markers;
    },
      // get visibility status of markers
    getShowMarker: (state) => {
        return state.showMarker;
    },
  }

  // actions
  const actions = {
    resetMap: ({ commit }) => {
        console.log("reset");
    },
  }

  // mutations
  const mutations = {
    setViewMap (state, { view }) {
        state.viewMap = view;
    },
    setLocationCenter (state, { center }) {
        state.locationCenter = center;
    },
    setMarkers (state, { markers }) {
        state.markers = markers;
    },
    setShowMarker (state, { showMarker }) {
        state.showMarker = showMarker;
    },
  }

  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
