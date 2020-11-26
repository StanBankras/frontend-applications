<div class="chart">
  <h4>Charging points</h4>
  <div>
    <svg id="chart" width="350" height="230">
      <XAxis {...XProps}/>
      <YAxis {...YProps}/>
      <g class="bars">
        { #each mappedData as bar }
        <rect
          fill={ bar.fill }
          height={ bar.height }
          width={ bar.width }
          x={ xPadding + bar.x }
          y={ bar.y }
        ></rect>
        { /each }
      </g>
      <text style="font-size: 12px; text-align: center" transform={ `translate(${ width / 2 + 10 }, ${ height + 45 })` }>Amount of charging points</text>
      <text style="font-size: 12px; text-align: center" transform={ `translate(20, ${ height / 2 + 40 }) rotate(270)` }>Parking count</text>
    </svg>
    
  </div>
</div>

<script>
  import { scaleBand, scaleLinear } from 'd3'; 
  import { hasItems } from '/src/utils/helpers.js';

  import { selectedParkings } from '/src/store/store.js';

  import XAxis from './XAxis.svelte';
  import YAxis from './YAxis.svelte';

  export let selectedParkingsMapped = {};

  let height = 180;
  let width = 270;
  let yPadding = 60;
  let xPadding = 60;
  let data = [];

  $: XProps = { height, width, mappedData, xPadding };
  $: YProps = { height, yTicks, y, yPadding };

  $: if($selectedParkings) data = [
    ['> 0', (chargingPoints.ezone || []).length, '#10ca10'],
    ['0', (selectedParkingsMapped.ezone || []).length - (chargingPoints.ezone || []).length, '#10ca10'],
    ['`> 0', (chargingPoints.nzone || []).length, '#ca1010'],
    ['`0', (selectedParkingsMapped.nzone || []).length - (chargingPoints.nzone || []).length, '#ca1010']
  ];

  $: x = scaleBand()
    .range([0, width])
    .padding(0.3)
    .domain(data.map(d => d[0]));

  $: y = scaleLinear()
    .range([height, 0])
    .domain([0, Math.max(...data.map(d => d[1]))]);

  $: yTicks = y.ticks(6);

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