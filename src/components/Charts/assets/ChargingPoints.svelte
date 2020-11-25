<div>
  <p>chargingPoints</p>
  <p>{ chargingPoints.ezone.length + ' ' + chargingPoints.nzone.length }</p>
</div>

<script>
  import { hasItems } from '/src/utils/helpers.js';

  export let selectedParkingsMapped = {};

  $: chargingPoints = {
    ezone: !selectedParkingsMapped || !hasItems(selectedParkingsMapped.ezone) ? 0 : getParkingsWithChargingPoints(selectedParkingsMapped.ezone),
    nzone: !selectedParkingsMapped || !hasItems(selectedParkingsMapped.nzone) ? 0 : getParkingsWithChargingPoints(selectedParkingsMapped.nzone),
  }

  function getParkingsWithChargingPoints(parkings) {
    return parkings.length > 0 ? parkings.filter(p => p.chargingPoints && Number(p.chargingPoints) > 0) : [];
  }
</script>