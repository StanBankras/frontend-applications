<div class="chart">
  <h4>Charging points</h4>
  <div>
    <svg id="chart" width="300" height="300">
      <g class="bars">
        { #each mappedData as bar }
        <rect
          fill={ bar.fill }
          height={ bar.height }
          width={ bar.width }
          x={ bar.x }
          y={ bar.y }
        ></rect>
        { /each }
      </g>
    </svg>
  </div>
</div>

<script>
  import { scaleBand, scaleLinear } from 'd3'; 
  import { hasItems } from '/src/utils/helpers.js';

  export let selectedParkingsMapped = {};

  let height = 300;
  let width = 300;

  $: data = [
    ['1 park with charging point', chargingPoints.ezone.length, '#10ca10'],
    ['2 no charging point', selectedParkingsMapped.ezone.length - chargingPoints.ezone.length, '#10ca10'],
    ['3 park with charging point', chargingPoints.nzone.length, '#ca1010'],
    ['4 no charging point', selectedParkingsMapped.nzone.length - chargingPoints.nzone.length, '#ca1010']
  ];

  $: x = scaleBand()
    .range([0, width])
    .padding(0.3)
    .domain(data.map(d => d[0]));

  $: y = scaleLinear()
    .range([height, 0])
    .domain([0, Math.max(...data.map(d => d[1]))]);

  $: mappedData = data.map(d => {
    return {
      xLabel: d[0],
      x: x(d[0]),
      y: y(d[1]),
      width: x.bandwidth(),
      height: height - y(d[1]),
      fill: d[2]
    };
  });

  $: chargingPoints = {
    ezone: !selectedParkingsMapped || !hasItems(selectedParkingsMapped.ezone) ? 0 : getParkingsWithChargingPoints(selectedParkingsMapped.ezone),
    nzone: !selectedParkingsMapped || !hasItems(selectedParkingsMapped.nzone) ? 0 : getParkingsWithChargingPoints(selectedParkingsMapped.nzone),
  }

  function getParkingsWithChargingPoints(parkings) {
    return !parkings || parkings.length > 0 ? parkings.filter(p => p.chargingPoints && Number(p.chargingPoints) > 0) : [];
  }
</script>

<style lang="scss">
  :global(.chart > div) {
    padding: 1rem;
    background-color: #F6E3D3; 
  }
  :global(.chart h4) {
    margin-bottom: 0.5rem;
  }
</style>