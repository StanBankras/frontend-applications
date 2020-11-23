<div id="main-wrapper">
  <div class="left">
    <h1>Is green transportation supported more in parking places that are situated in environmental zones?</h1>
    <p class="subtitle">
      Select a 
      <span class="legend-dot municipality-dot"/> <b>municipality</b> 
      to find out more in comparison to the 
      <span class="legend-dot environment-dot"/> <b>environmental zone</b> 
      inside it
    </p>
    <div id="sankey">
      sankey will come here
    </div>
    { #if $selectedParkings.length > 0 }
    <div transition:fade>
      <Table/>
    </div>
    { /if }
  </div>
  <div class="map-wrapper">
    <div id="map">
      { #if $parkingData }
      <div class="map">
        <Map/>
      </div>
      { :else }
      <div class="loader-container" v-else>
        <img src="@/assets/img/loader.svg" alt="loader">
      </div>
      { /if }
    </div>
  </div>
</div>
<p style="margin-left: 10rem; margin-top: 4rem;">
  Example I used for the map:
  <a href="https://makeshiftinsights.com/blog/d3-vue-choropleth/" target="_blank">https://makeshiftinsights.com/blog/d3-vue-choropleth/</a>
</p>

<script>
  // Svelte
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  // Utils
  import { getData } from './utils/helpers';
  import { settings } from './utils/settings';
  import { newDataset } from './utils/mergedata';
  import { getCenterCoord, isCoordInEnvironmentalZone } from './services/zoneservice';
  import { getNpropendata } from './services/nprservice';

  // Components
  import Map from './components/Map/Index.svelte';
  import Table from './components/Table/Table.svelte';

  // Data
  import { selectedParkings, eZones, parkingData } from '/src/store/store';

  onMount(async () => {
    $eZones = await getData('/data/milieuzones.json');

    const dataset = await newDataset(settings.endpoints, settings.sharedKey);
    const tariffData = await getData('data/extras.json');
    
    $parkingData = await Promise.all(dataset
      .map(x => {
        const obj = x;
        obj.chargingPoints = x.chargingpointcapacity;
        obj.centerCoord = getCenterCoord(x.areageometryastext);
        obj.environmentalZone = isCoordInEnvironmentalZone(obj.centerCoord, $eZones);
        return obj;
      })
      .map(async (x) => {
        const obj = x;
        const npropendata = await getNpropendata(obj.areaid, tariffData);
        obj.tariffs = npropendata.tariffs;
        obj.specifications = npropendata.specifications;
        obj.overallAverageTariff = Object.values(obj.tariffs || [])
          .map(x => x.averageTariff)
          .reduce((prev, cur) => prev + cur, 0) / Object.keys(obj.tariffs || []).length;

        return obj;
      }));
  });
</script>

<style lang="scss">
:global(body) {
  margin: 0;
  max-height: 100vw;
  background-color: #fffaec;
}
h1 {
  margin-bottom: 1rem;
  margin-top: 0;
}
p {
  margin: 0;
  &.subtitle {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  b {
    margin-right: 0.5rem;
  }
}
#main-wrapper {
  max-height: 100vw;
  margin: 0;
  display: grid;
  grid-template-columns: 675px 1fr;
  margin-left: 10rem;
  margin-top: 4rem;
  .left {
    max-width: 600px;
    margin-right: 4rem;
    #sankey {
      width: 100%;
      height: 300px;
      border: 1px solid red;
      padding: 1rem;
      margin-bottom: 2rem;
    }
  }
  .map-wrapper {
    width: 100%;
    max-height: 1000px;
    overflow: hidden;
  }
  #map {
    .map {
      max-width: 1000px;
      position: absolute;
      right: 0;
      top: 0;
      width: 1000px;
      height: 100vh;
    }
    .loader-container {
      width: 100%;
      height: 100%;
      min-height: 80vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.legend-dot {
  display: block;
  height: 15px;
  width: 15px;
  background-color: black;
  border: 2px solid black;
  margin: 0 0.5rem;
  &.municipality-dot {
    background-color: rgb(255 227 205);
  }
  &.environment-dot {
    background-color: rgb(16, 202, 16);
  }
}
</style>