<template>
    <div>
        <b-container class="mb-1">
            <b-row>
                <b-col cols="2" class="text-right" align-v="center">
                    <b-container class="mt-3">
                        <strong><label for="select-location">Select Location</label></strong>
                    </b-container>
                </b-col>
                <b-col>
                    <b-form-select id="select-location" v-model="activeLocation" :options="locations" size="sm" class="mt-3">
                        <b-form-select-option :value="null">Please select an option</b-form-select-option>
                    </b-form-select>
                </b-col>
            </b-row>
        </b-container>
        <div class="container mb-2">
            <b-button v-b-toggle.collapse-1 variant="primary">Add filter...</b-button>
            <b-collapse id="collapse-1" class="mt-2">
                <b-form-group label="Location Categories" v-slot="{ ariaDescribedby }">
                    <b-container class="text-right">
                        <b-button class="btn-rst" @click="resetCategories">Reset</b-button>
                    </b-container>
                    <b-card class='main-cat' v-for="(category, index) in categories" :key="category.id">
                        <b-container>
                            <b-row align-v="center">
                                <b-col class="text-left" align-v="center">
                                    <b-form-checkbox
                                        v-model="searchCategory"
                                        :value="category.id"
                                        :aria-describedby="ariaDescribedby"
                                    >
                                    {{ category.name }}
                                    </b-form-checkbox>
                                </b-col>

                                <b-col class="text-right">
                                    <b-btn class="cat-chevron" href="#" v-b-toggle="'collapse-1-inner-'+index" variant="secondary">
                                        <span class="when-opened">
                                            <b-icon icon="chevron-up" variant="info"></b-icon>
                                        </span>
                                        <span class="when-closed">
                                            <b-icon icon="chevron-down" variant="info"></b-icon>
                                        </span>
                                    </b-btn>
                                </b-col>
                            </b-row>
                        </b-container>
                        <b-collapse :id="'collapse-1-inner-'+index" class="mt-2">
                            <b-card class="sub-cat" v-for="subcategory in category.categories" :key="subcategory.id">
                                <b-form-checkbox
                                    v-model="searchCategory"
                                    :value="subcategory.id"
                                    :aria-describedby="ariaDescribedby"
                                >
                                {{ subcategory.name }}
                                </b-form-checkbox>
                            </b-card>
                        </b-collapse>
                    </b-card>
                </b-form-group>
            </b-collapse>
            <b-button @click="search" variant="primary">Search</b-button>
        </div>
        <div class="container mb-3" v-if="Object.keys(locationInfo).length > 0">
            <b-container>
                <b-container>
                    <center><h1>Top Results (Maximum: 5)</h1></center>
                </b-container>
                <b-container class="mb-3 venue-result" sm="auto" v-for="(venue, index) in locationInfo.response.venues" :key="index">
                    <b-row>
                    <strong>{{ venue.name }}</strong>
                    </b-row>
                    <b-row>
                        <ul>
                            <li v-for="(addInfo, index) in venue.location.formattedAddress" :key="index"> {{ addInfo }}</li>
                        </ul>
                    </b-row>
                    <b-row>
                        <b-badge v-for="(cat, index) in venue.categories" :key="index"><img class="cat-icon" :src="cat.icon.prefix+32+cat.icon.suffix" alt="">{{ cat.shortName }}</b-badge>
                    </b-row>
                </b-container>
            </b-container>
        </div>
        <b-container class="text-center mb-2">
            <b-button @click="toggleMapView">Map</b-button>
        </b-container>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'

export default ({
    data() {
        return {
            searchCategory: []
        }
    },
    computed: {
        ...mapState ( {
            searchLocation: state => state.location.activeLocation,
            locations: state => state.location.locationList,
            categories: state => state.location.categories,
            locationInfo: state => state.location.locationInfo,
            viewMap: state => state.map.viewMap,
        }),
        activeLocation: {
            get() {
                return this.searchLocation
            },
            set(newLocation) {
                this.setActiveLocation({ location: newLocation })
            }
        }
    },
    methods: {
        ...mapActions('location', {
            loadCategories: 'loadCategories',
            findLocation: 'findLocation'
        }),
        ...mapMutations('location', {
            setActiveLocation: 'setActiveLocation',
            setActiveCategory: 'setActiveCategory',
        }),
        ...mapMutations('map', {
            setViewMap: 'setViewMap',
        }),
        search() {
            if (this.activeLocation==null) {
                alert("Nothing to send");
            } else {
                if(this.searchCategory!=null && this.searchCategory.length > 0) this.setActiveCategory({ category: this.searchCategory })
                this.findLocation();
            }
        },
        toggleMapView() {
            this.setViewMap({ view: !this.viewMap });
        },
        resetCategories() {
            this.searchCategory=[];
        }
    },
    created() {
        this.loadCategories();
    },
    mounted() {
    }
})
</script>

<style scoped>
    .cat-icon {
        height: 2em;
        width: auto;
    }
    .collapsed > .when-opened,
    :not(.collapsed) > .when-closed {
        display: none;
    }
    .card-body {
        padding: .25rem !important;
        vertical-align: center;
    }
    .sub-cat {
        padding-left: 3rem;
        border: none;
    }
    .cat-chevron {
        background-color: #fff;
        border: none;
        outline: none !important;
    }
    .btn-rst {
        padding: 2px;
        margin:2px;
    }
    .div-label{
        margin: auto;
    }
    .venue-result {
        border-bottom: 2px solid rgb(211, 211, 211);
        padding-left: 3rem !important;
        padding-bottom: 1rem;
    }
</style>
