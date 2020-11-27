<div>
  { #if $selectedParkings && $selectedParkings.length > 0 && $selectedMunicipality }
  <h3>Statistieken voor parkeerplaatsen ({ $selectedParkings.length }) in { $selectedMunicipality.properties.name }</h3>
  { :else }
  <h3>Statistieken voor alle parkeerplaatsen ({ allParkings.length }) in gemeentes met een milieuzone</h3>
  { /if }
  { #if $parkingData && $parkingData.length > 0 }
  <div class="charts">
    <ChargingPoints bind:selectedParkingsMapped/>
    <ParkAndRide bind:selectedParkingsMapped/>
    <CostPerHour
      bind:data={ costPerHour.ezone }
      title="Parkeerkosten per uur (milieuzone) in €"
      color="#10ca10"
      name="parkeerplaatsen in milieuzones"/>
    <CostPerHour
      bind:data={ costPerHour.nzone }
      title="Parkeerkosten per uur (niet-milieuzone) in €"
      color="#ca1010"
      name="parkeerplaatsen in niet-milieuzones"
    />
  </div>
  { :else }
  <div class="loader">
    <img src="/img/loader.svg" alt="loader">
  </div>
  { /if }
</div>

<script>
  import { selectedParkings, selectedMunicipality, parkingData, parkingsPerMunicipality } from '/src/store/store.js';
  import { hasItems } from '/src/utils/helpers.js';

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

  $: costPerHour = {
    ezone: !selectedParkingsMapped || !hasItems(selectedParkingsMapped.ezone) ? [] : mapCostPerHour(selectedParkingsMapped.ezone),
    nzone: !selectedParkingsMapped || !hasItems(selectedParkingsMapped.nzone) ? [] : mapCostPerHour(selectedParkingsMapped.nzone),
  }

  function mapCostPerHour(parkings) {
    return parkings.map(parking => parking.overallAverageTariff ? Math.ceil(parking.overallAverageTariff * 60) : 0);
  }

  $: selectedParkingsMapped = {
    ezone: selected.filter(p => p.environmentalZone), // environmental zone
    nzone: selected.filter(p => !p.environmentalZone) // normal zone
  }
</script>

<style lang="scss">
  h3 {
    margin-bottom: 1rem;
    font-size: 23px;
  }
  .charts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
</style>