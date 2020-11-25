<div class="chart">
  <h4>Park and ride %</h4>
  <div>
    <p>parkAndRides</p>
    <p>{ parkAndRides.ezone + ' ' + parkAndRides.nzone }</p>
  </div>
</div>

<script>
  import { hasItems } from '/src/utils/helpers.js';

  export let selectedParkingsMapped = {};

  $: parkAndRides = {
    ezone: !selectedParkingsMapped || !hasItems(selectedParkingsMapped.ezone) ? 0 : getParkAndRideTotals(selectedParkingsMapped.ezone),
    nzone: !selectedParkingsMapped || !hasItems(selectedParkingsMapped.nzone) ? 0 : getParkAndRideTotals(selectedParkingsMapped.nzone),
  }

  function isParkAndRide(parking) {
    return parking.specifications[0].usage.toLowerCase().includes('park') && parking.specifications[0].usage.toLowerCase().includes('ride');
  }

  function hasUsage(parking) {
    return parking.specifications && parking.specifications[0].usage;
  }

  function getParkAndRideTotals(parkings) {
    return parkings.length > 0 ? parkings.reduce((acc, curr) => acc + (hasUsage(curr) && isParkAndRide(curr) ? 1 : 0), 0) : [];
  }
</script>