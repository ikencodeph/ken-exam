<template>
    <b-container fluid>
        <div id="mapContainer" v-show="viewMap"></div>
    </b-container>
</template>
<script>
    import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'

    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

    export default {
    name: "Map",
        data() {
            return{
                center: [139.6425, 35.44778]
            }
        },
        computed: {
            ...mapState({
                viewMap: state => state.map.viewMap,
                locationCenter: state => state.map.locationCenter,
                markers: state => state.map.markers,
                showMarker: state => state.map.showMarker,
                locationInfo: state => state.location.locationInfo
            })
        },
        watch: {
            locationInfo (newInfo, oldInfo){
                this.setupLeafletMap();
            },
            viewMap(newValue) {
                if (newValue) {
                    setTimeout(() => {
                        this.setupLeafletMap();
                    }, 1000);
                }
            }
        },
        methods: {
            setupLeafletMap: function () {
                // check first if location info is set
                if (Object.keys(this.locationInfo).length > 0) {
                    let ll = this.locationInfo.response.geocode.feature.geometry.center;
                    this.center = [ll.lng, ll.lat];
                }
                mapboxgl.accessToken = process.env.MIX_MP_ACCESS_TOKEN;
                var map = new mapboxgl.Map({
                    container: 'mapContainer',
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: this.center,
                    zoom:13
                });

                // check the markers for the venues
                if (Object.keys(this.locationInfo).length != 0) {
                    if(this.showMarker) {
                        let ven = this.locationInfo.response.venues;
                        if (ven.length > 0) {
                            let marker = null;
                            let popupTemplate = "";
                            for (let i in ven) {
                                let llVen = ven[i].location;
                                popupTemplate="<h3>"+ven[i].name+"</h3>"+
                                    "<p>"+
                                    llVen.formattedAddress.join("</br>")
                                    +"</p>";
                                marker = new mapboxgl.Marker()
                                    .setLngLat([llVen.lng, llVen.lat])
                                    .setPopup(new mapboxgl.Popup().setHTML(popupTemplate))
                                    .addTo(map);
                                marker.togglePopup();
                                }
                            }

                        }
                    }
                }
            },
            mounted() {
                if (this.viewMap) {
                    this.setupLeafletMap();
                }
        },
    };
</script>

<style scoped>
@import "leaflet/dist/leaflet.css";
#mapContainer {
 height: 100vh;
}
@media only screen and (max-width: 600px) {
  #mapContainer {
     height: 60vh;
  }
}
</style>
