<template>
    <b-container>
        <b-container class="text-center" v-show="Object.keys(weatherInfo).length > 0">
            <h1>Weather Forecast</h1>
        </b-container>
        <b-container class="text-center" align-h="center">
            <b-row class="justify-content-md-center">
                <b-col
                    sm="12"
                    md="2"
                    width="25%"
                    class="mb-2 mr-2 weather-card"
                    v-for="(weather, index) in weatherInfo.list" :key="index"
                    >
                    <b-container>
                        <strong>{{weather.dt_txt}}</strong>
                    </b-container>
                    <b-container v-for="(w, index) in weather.weather" :key="index" class="justify-content-md-center">
                        <b-row align-v="center" class="justify-content-md-center" >
                            <img :src="'http://openweathermap.org/img/wn/'+w.icon+'@2x.png'" alt=""> <strong>{{ weather.main.temp}}<span>&#8451;</span></strong>
                        </b-row>
                        <b-row>
                            <b-container class="text-center">
                                <span class="desc">{{ w.description }}</span>
                            </b-container>
                        </b-row>
                    </b-container>
                </b-col>
            </b-row>
        </b-container>
    </b-container>
</template>

<script>

import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'

export default ({
    data() {
        return {
            search: '',
        }
    },
    computed: {
        ...mapState ( {
            searchLocation: state => state.location.activeLocation,
            weatherInfo: state=> state.weather.weatherInfo,
        }),
    },
    methods: {
        ...mapMutations('weather', {
            setWeatherInfo: 'setWeatherInfo',
        }),
        ...mapActions('weather', {
            loadWeatherInfo: 'loadWeatherInfo'
        })
    }
})
</script>

<style scoped>
    .weather-card {
        border: 1px solid #aaa !important;
        min-width: 20em;
        border-radius: 1rem ;
        padding-bottom: 2rem;
    }
    .desc{
        color: rgb(143, 143, 143);
        font-weight: 500;
    }
</style>
