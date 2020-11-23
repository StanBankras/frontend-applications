<svg width="100%" height="100%">
  <g class="provinces">
    { #each provinceData.features as province }
    <path d={pathGenerator(province)}/>
    { /each }
  </g>
  <g class="municipalities">
    { #each $filteredMunicipalities.features as municipality }
    <path on:click={ selectMunicipality(municipality) } d={pathGenerator(municipality)}/>
    { /each }
  </g>
  <SelectedParkings bind:projection/>
  <EnvironmentZones bind:pathGenerator/>
</svg>
<Labels bind:selectedZone/>

<script>
  import { onMount } from 'svelte';
  import { geoMercator, geoPath } from 'd3';
  import { getData } from '/src/utils/helpers';
  import { getCenterCoordFromPolygon } from '/src/services/zoneservice';
  import { fade } from 'svelte/transition';

  import { selectedParkings, selectedMunicipality, filteredMunicipalities, parkingsPerMunicipality } from '/src/store/store';

  import Labels from './Labels.svelte';
  import EnvironmentZones from './EnvironmentZones.svelte';
  import SelectedParkings from './SelectedParkings.svelte';

  let provinceData = { features: [] };
  let municipalityData = { features: [] };
  export let environmentalZones = [];
  
  $: eZoneNames = [...new Set((environmentalZones || []).map(x => x.municipality.toLowerCase().replace('-', ' ')))];
  $: $filteredMunicipalities = {
      features: municipalityData.features
        .filter(x => eZoneNames.includes(x.properties.name.toLowerCase().replace('-', ' ')))
    }

  let centerPoint = [4.69, 52.1];
  $: if(selectedZone) {
    centerPoint = getCenterCoordFromPolygon(selectedZone.geometry.coordinates[0][0]);
  } else {
    centerPoint = [4.69, 52.1];
  }

  let selectedZone = undefined;

  $: if(Object.keys($parkingsPerMunicipality).length > 0 && selectedZone) {
    $selectedParkings = $parkingsPerMunicipality[selectedZone.properties.name];
    $selectedMunicipality = selectedZone;
  } else {
    $selectedParkings = [];
    $selectedMunicipality = undefined;
  }

  $: projection = geoMercator()
      .center(centerPoint)
      .scale(selectedZone ? 50000 : 19000);
  $: pathGenerator = geoPath().projection(projection);

  function selectMunicipality(municipality) {
    if(selectedZone && selectedZone.properties.name === municipality.properties.name) {
      return selectedZone = undefined;
    }
    selectedZone = municipality;
  }

  onMount(async () => {
    provinceData = await getData('data/provinces.json');
    municipalityData = await getData('data/townships.json');
  });
</script>

<style lang="scss">
  :global(*) {
    transition: .5s ease-in-out;
  }
  .provinces {
    fill: #ddb89b;
    stroke-width: 5px;
    stroke: #fffaec;
    cursor: grabbing;
  }
  .municipalities {
    path {
      stroke: black;
      stroke-width: 1px;
      fill: rgb(255 227 205);
      &:hover {
        stroke-width: 3px;
        cursor: pointer;
      }
    }
  }
</style>