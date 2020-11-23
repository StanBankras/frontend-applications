<g class="municipalities">
  { #each $filteredMunicipalities.features as municipality }
  <path on:click={ selectMunicipality(municipality) } d={pathGenerator(municipality)}/>
  { /each }
</g>

<script>
  import { filteredMunicipalities, eZones, parkingsPerMunicipality, selectedParkings, selectedMunicipality } from '/src/store/store';
  export let pathGenerator = undefined;
  export let municipalityData = [];
  
  $: eZoneNames = [...new Set(($eZones || []).map(x => x.municipality.toLowerCase().replace('-', ' ')))];
  $: $filteredMunicipalities = {
      features: municipalityData.features
        .filter(x => eZoneNames.includes(x.properties.name.toLowerCase().replace('-', ' ')))
    }

  let selectedZone = undefined;

  $: if(Object.keys($parkingsPerMunicipality).length > 0 && selectedZone) {
    $selectedParkings = $parkingsPerMunicipality[selectedZone.properties.name];
    $selectedMunicipality = selectedZone;
  } else {
    $selectedParkings = [];
    $selectedMunicipality = undefined;
  }

function selectMunicipality(municipality) {
  if(selectedZone && selectedZone.properties.name === municipality.properties.name) {
    return selectedZone = undefined;
  }
  selectedZone = municipality;
}
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