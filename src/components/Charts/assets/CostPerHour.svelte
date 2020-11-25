<div>
  <p>costPerHour</p>
  <p>{ costPerHour.ezone.length + ' ' + costPerHour.nzone.length }</p>
</div>

<script>
  import { hasItems } from '/src/utils/helpers.js';

  export let selectedParkingsMapped = {};

  $: costPerHour = {
    ezone: !selectedParkingsMapped || !hasItems(selectedParkingsMapped.ezone) ? 0 : mapCostPerHour(selectedParkingsMapped.ezone),
    nzone: !selectedParkingsMapped || !hasItems(selectedParkingsMapped.nzone) ? 0 : mapCostPerHour(selectedParkingsMapped.nzone),
  }

  function mapCostPerHour(parkings) {
    return parkings.map(parking => parking.overallAverageTariff ? parking.overallAverageTariff : 0);
  }
</script>