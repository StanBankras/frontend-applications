{ #if $parkingData && $parkingData.length > 0 }
<div class="wrapper">
  <svg width="100%" height="100%">
    <Provinces bind:pathGenerator bind:provinceData/>
    <Municipalities bind:pathGenerator bind:municipalityData/>
    <SelectedParkings bind:projection/>
    <EnvironmentZones bind:pathGenerator/>
  </svg>
  <Labels/>
</div>
{ :else }
<div class="loader">
  <img src="/img/loader.svg" alt="loader">
</div>
{ /if }

<script>
  // Modules
  import { onMount } from 'svelte';
  import { geoMercator, geoPath, zoom, select, selectAll, zoomIdentity } from 'd3';

  // Helpers
  import { getData } from '/src/utils/helpers';
  import { getCenterCoordFromPolygon } from '/src/services/zoneservice';

  // Store
  import { selectedMunicipality, parkingData } from '/src/store/store';

  // Components
  import Labels from './assets/Labels.svelte';
  import EnvironmentZones from './assets/EnvironmentZones.svelte';
  import SelectedParkings from './assets/SelectedParkings.svelte';
  import Municipalities from './assets/Municipalities.svelte';
  import Provinces from './assets/Provinces.svelte';

  // Data
  let provinceData = { features: [] };
  let municipalityData = { features: [] };
  let centerPoint = [4.69, 52.1];

  function zoomed(e) {
    selectAll('svg g').attr("transform", e.transform);
  }

  function resetZoom() {
    selectAll('svg g').call(zooming.transform, zoomIdentity);
  }

  $: if($selectedMunicipality && $selectedMunicipality.geometry) {
    centerPoint = getCenterCoordFromPolygon($selectedMunicipality.geometry.coordinates[0][0]);
  } else {
    centerPoint = [4.69, 51.9];
  }

  $: zooming = zoom().on('zoom', (e) => zoomed(e));

  $: if($selectedMunicipality || !$selectedMunicipality) resetZoom();

  $: projection = geoMercator()
      .center(centerPoint)
      .scale($selectedMunicipality && $selectedMunicipality.geometry ? 50000 : 16000);

  $: pathGenerator = geoPath().projection(projection);

  // Load async data
  onMount(async () => {
    provinceData = await getData('data/provinces.json');
    municipalityData = await getData('data/townships.json');
    // selectAll('svg g').call(zooming);
  });
</script>

<style lang="scss">
  :global(*) {
    transition: .3s ease-in-out;
  }
  .wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .loader {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>