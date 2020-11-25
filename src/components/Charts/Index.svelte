<div>
  { #if $selectedParkings && $selectedParkings.length > 0 && $selectedMunicipality }
  <h3>Stats for all parkings in { $selectedMunicipality.properties.name }</h3>
  { :else }
  <h3>Stats for all parkings in municipalities with an environmental zone</h3>
  { /if }
  { #if $parkingData && $parkingData.length > 0 }
  <div class="charts">
    <ChargingPoints bind:selectedParkingsMapped/>
    <ParkAndRide bind:selectedParkingsMapped/>
    <CostPerHour bind:selectedParkingsMapped/>
  </div>
  { :else }
  <div class="loader">
    <img src="/img/loader.svg" alt="loader">
  </div>
  { /if }
</div>

<script>
  import { selectedParkings, selectedMunicipality, parkingData, parkingsPerMunicipality } from '/src/store/store.js';

  import ChargingPoints from './assets/ChargingPoints.svelte';
  import ParkAndRide from './assets/ParkAndRide.svelte';
  import CostPerHour from './assets/CostPerHour.svelte';

  let allParkings;
  $: if($parkingsPerMunicipality) {
    const parkings = [];
    Object.values($parkingsPerMunicipality).forEach(arr => {
      arr.forEach(parking => {
        if(!parking) return;
        parkings.push(parking);
      })
    });
    allParkings = parkings;
  }

  $: selected = $selectedParkings.length > 0 ? $selectedParkings : allParkings;

  $: selectedParkingsMapped = {
    ezone: selected.filter(p => p.environmentalZone), // environmental zone
    nzone: selected.filter(p => !p.environmentalZone) // normal zone
  }
</script>

<style lang="scss">
  h3 {
    margin-bottom: 0.5rem;
    font-size: 25px;
  }
  .charts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
</style>