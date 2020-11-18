<div class="table">
  <div class="row">
    <p class="title">Average</p>
    <p class="title green">Environmental zone</p>
    <p class="title red">Non-environmental zone</p>
  </div>
  <div class="row">
    <p class="title">Park with charge point</p>
    <p>{ Number(chargingPointPercentage.ezone).toFixed(2) }%</p>
    <p>{ Number(chargingPointPercentage.nzone).toFixed(2) }%</p>
  </div>
  <div class="row">
    <p class="title">€ cost / hour parking</p>
    <p>{ Number(averageCostPerHour.ezone).toFixed(2) }</p>
    <p>{ Number(averageCostPerHour.nzone).toFixed(2) }</p>
  </div>
  <div class="row">
    <p class="title">Park and ride %</p>
    <p>{ Number(parkAndRidePercentage.ezone).toFixed(2) }%</p>
    <p>{ Number(parkAndRidePercentage.nzone).toFixed(2) }%</p>
  </div>
</div>

<script>
  import { hasItems } from '/src/utils/helpers.js';

  import { selectedParkings } from '/src/store/store';
  
  $: selectedParkingsMapped = {
    ezone: $selectedParkings.filter(p => p.environmentalZone), // environmental zone
    nzone: $selectedParkings.filter(p => !p.environmentalZone) // normal zone
  }
  $: chargingPointPercentage = {
    ezone: !hasItems(selectedParkingsMapped.ezone) ? 0 : getParkingsWithChargingPointsPercentage(selectedParkingsMapped.ezone),
    nzone: !hasItems(selectedParkingsMapped.nzone) ? 0 : getParkingsWithChargingPointsPercentage(selectedParkingsMapped.nzone),
  }
  $: averageCostPerHour = {
    ezone: !hasItems(selectedParkingsMapped.ezone) ? 0 : getAverageCostPerHour(selectedParkingsMapped.ezone),
    nzone: !hasItems(selectedParkingsMapped.nzone) ? 0 : getAverageCostPerHour(selectedParkingsMapped.nzone),
  }
  $: parkAndRidePercentage = {
    ezone: !hasItems(selectedParkingsMapped.ezone) ? 0 : getParkAndRidePrecentage(selectedParkingsMapped.ezone),
    nzone: !hasItems(selectedParkingsMapped.nzone) ? 0 : getParkAndRidePrecentage(selectedParkingsMapped.nzone),
  }

  function hasUsage(parking) {
    return parking.specifications && parking.specifications[0].usage;
  }
  function isParkAndRide(parking) {
    return parking.specifications[0].usage.toLowerCase().includes('park') && parking.specifications[0].usage.toLowerCase().includes('ride');
  }
  function getParkingsWithChargingPointsPercentage(parkings) {
    return parkings.filter(p => p.chargingPoints && Number(p.chargingPoints) > 0).length / parkings.length * 100;
  }
  function getAverageCostPerHour(parkings) {
    return parkings.reduce((acc, curr) => acc + (curr.overallAverageTariff ? curr.overallAverageTariff : 0), 0) / parkings.length * 60;
  }
  function getParkAndRidePrecentage(parkings) {
    return parkings.reduce((acc, curr) => acc + (hasUsage(curr) && isParkAndRide(curr) ? 1 : 0), 0) / parkings.length * 100;
  }
</script>

<style lang="scss">
  .table {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    .row {
      display: grid;
      grid-template-columns: 3fr 180px 200px;
      gap: 1rem;
      > p {
        background-color: #A59789;
        color: white;
        padding: 0.8rem 1rem;
        margin: 0;
        &.title {
          font-weight: bold;
          background-color: #e2dbc8;
          color: #716252;
          &.green {
            color: rgb(47, 151, 47);
          }
          &.red {
            color: red;
          }
        }
      }
    }
    margin-top: 1rem;
  }
  </style>