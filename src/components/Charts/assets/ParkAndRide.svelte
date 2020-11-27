<div class="chart">
  <h4>Park & ride %</h4>
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
      <text style="font-size: 12px; text-align: center" transform={ `translate(20, ${ height / 2 + 70 }) rotate(270)` }>Aantal parkeerplaatsen</text>
    </svg>
  </div>
</div>

<script>
  import { scaleBand, scaleLinear } from 'd3';
  import { hasItems } from '/src/utils/helpers.js';
  import { selectedParkings } from '/src/store/store.js';

  export let selectedParkingsMapped = {};

  import XAxis from './XAxis.svelte';
  import YAxis from './YAxis.svelte';

  let height = 180;
  let width = 300;
  let yPadding = 60;
  let xPadding = 60;
  let data = [];

  $: XProps = { height, width, mappedData, xPadding };
  $: YProps = { height, yTicks, y, yPadding };

  $: if($selectedParkings) data = [
    ['Milieuzone', parkAndRides.ezone / selectedParkingsMapped.ezone.length * 100, '#10ca10'],
    ['Niet-milieuzone', parkAndRides.nzone / selectedParkingsMapped.nzone.length * 100, '#ca1010']
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