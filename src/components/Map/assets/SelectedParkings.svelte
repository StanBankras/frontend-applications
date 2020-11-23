<g class="municipality-parkings">
  { #each parkingsMapped as parking }
  <circle
    r="3"
    cx={parking.x}
    cy={parking.y}
    class="active"
    class:ezone={parking.ezone}/>   
  { /each }
</g>

<script>
  import { selectedParkings, filteredMunicipalities, parkingsPerMunicipality, selectedMunicipality } from '/src/store/store.js';
  import { isCoordInMunicipality } from '/src/services/zoneservice';

  export let projection = undefined;

  $: parkingsMapped = $parkingsPerMunicipality && $selectedParkings && $selectedParkings.length > 0 ? $parkingsPerMunicipality[$selectedMunicipality.properties.name]
  .filter(p => p.centerCoord.length > 1 && !isNaN(p.centerCoord[0]) && !isNaN(p.centerCoord[1]))
  .map(parking => {
    return {
      ezone: parking.environmentalZone,
      id: parking.areaId,
      x: projection(parking.centerCoord)[0],
      y: projection(parking.centerCoord)[1]
    }
  }) : [];
</script>

<style lang="scss">
  .municipality-parkings {
    transition: .3s ease-in-out;
    pointer-events: none;
    circle {
      fill: rgba(0, 0, 0, 0.1);
      &.active {
        fill: red;
      }
      &.ezone {
        fill: lightgreen;
        z-index: 100;
      }
    }
  }
</style>