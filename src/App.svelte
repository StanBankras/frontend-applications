<Question/>
<Information/>
<div id="map">
  { #await $parkingData }
  <div class="loader-container" v-else>
    <img src="/src/assets/img/loader.svg" alt="loader">
  </div>
  { :then data }
  <div class="map">
    <Map/>
  </div>
  { /await }
</div>
<div class="left">
  { #if $selectedParkings.length > 0 || $parkingData.length > 0 }
  <div transition:fade>
    <Table/>
  </div>
  { /if }
</div>

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
  import Question from './components/Question.svelte';
  import Information from './components/Information.svelte';

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
:global(*) {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:global(body) {
  margin: 0;
  max-height: 100vw;
  background-color: #fffaec;
}
.map {
  width: 1000px;
  height: 900px;
}
.loader-container {
  width: 100%;
  height: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>