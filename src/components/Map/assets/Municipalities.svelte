<g class="municipalities">
  { #each $filteredMunicipalities.features as municipality }
  <path on:click={ selectMunicipality(municipality) } d={pathGenerator(municipality)}/>
  { /each }
</g>

<script>
  import { onMount } from 'svelte';
  import { pointer } from 'd3';
  import { filteredMunicipalities, eZones, parkingsPerMunicipality, selectedParkings, selectedMunicipality } from '/src/store/store';
  export let pathGenerator = undefined;
  export let municipalityData = [];
  
  $: eZoneNames = [...new Set(($eZones || []).map(x => x.municipality.toLowerCase().replace('-', ' ')))];

  $: $filteredMunicipalities = {
      features: municipalityData.features
        .filter(x => eZoneNames.includes(x.properties.name.toLowerCase().replace('-', ' ')))
    }

  $: if(Object.keys($parkingsPerMunicipality).length > 0 && $selectedMunicipality && $selectedMunicipality.properties) {
    $selectedParkings = $parkingsPerMunicipality[$selectedMunicipality.properties.name];
  } else {
    $selectedParkings = [];
  }

  function selectMunicipality(municipality) {
    if($selectedMunicipality && $selectedMunicipality.properties && $selectedMunicipality.properties.name === municipality.properties.name) {
      $selectedMunicipality = undefined;
      window.localStorage.removeItem('selectedMunicipality');
    } else {
      $selectedMunicipality = municipality;
      window.localStorage.setItem('selectedMunicipality', JSON.stringify(municipality));
    }
  }

  onMount(() => {
    const selected = window.localStorage.getItem('selectedMunicipality');
    if(!selected) return;
    $selectedMunicipality = JSON.parse(selected);
  })
</script>

<style lang="scss">
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