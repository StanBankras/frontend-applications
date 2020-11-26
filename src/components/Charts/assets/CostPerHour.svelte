<div class="chart">
  <h4>Parking cost per hour</h4>
  <div>
    <svg id="chart" width="350" height="230">
      <XAxis {...XProps}/>
      { #each bins as d }
      <rect
        x={ x(d.x0) + 1 }
        y={ y(d.length) }
        width={ Math.max(0, x(d.x1) - x(d.x0) - 1) }
        height={ y(0) - y(d.length) }
        fill="red">
      </rect>
      { /each }
    </svg>
  </div>
</div>

<script>
  import { hasItems } from '/src/utils/helpers.js';
  import { scaleLinear, histogram, bin, max } from 'd3';
  import XAxis from './XAxis.svelte';

  export let selectedParkingsMapped = {};

  $: costPerHour = {
    ezone: !selectedParkingsMapped || !hasItems(selectedParkingsMapped.ezone) ? [] : mapCostPerHour(selectedParkingsMapped.ezone),
    nzone: !selectedParkingsMapped || !hasItems(selectedParkingsMapped.nzone) ? [] : mapCostPerHour(selectedParkingsMapped.nzone),
  }

  $: allData = [...costPerHour.ezone, ...costPerHour.nzone];

  let height = 200;
  let width = 350;

  $: bins = bin().thresholds(10)(allData.filter(x => x < 100));

  $: XProps = { height, width, xPadding: 20, mappedData: bins.map(bin => { return { x: x(bin.x0), width: 5, xLabel: bin.x0 } }) };

  $: x = scaleLinear()
    .domain([bins[0].x0, bins[bins.length - 1].x1])
    .range([30, width - 30]);
  
  $: y = scaleLinear()
    .domain([0, max(bins, d => d.length)]).nice()
    .range([height - 30, 30]);

  function mapCostPerHour(parkings) {
    return parkings.map(parking => parking.overallAverageTariff ? Math.ceil(parking.overallAverageTariff * 60) : 0);
  }
</script>