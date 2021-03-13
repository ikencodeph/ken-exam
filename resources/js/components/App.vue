<template>
    <div class="container">
        <div class="content">
            <location/>
            <mb-map></mb-map>
            <weather/>
        </div>
        <div>
        </div>
    </div>
</template>

<script>

import weather from "./modules/Weather";
import location from "./modules/Location";
import mbMap from "./modules/Map";

export default({
    components: {
        weather,
        location,
        mbMap
    }
})
</script>
