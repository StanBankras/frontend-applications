<div class="chart">
  <h4>{ title }</h4>
  <div>
    { #if bins[0].length > 0 }
    <svg id="chart" width="350" height="230">
      <XAxis {...XProps}/>
      <YAxis {...YProps}/>
      { #each bins as d }
      <rect
        x={ xPadding + x(d.x0) + 1 }
        y={ y(d.length) }
        width={ Math.max(20, x(d.x1) - x(d.x0) - 5) }
        height={ y(0) - y(d.length) }
        fill={ color }>
      </rect>
      { /each }
      <text style="font-size: 12px; text-align: center" transform={ `translate(${ width / 2 }, ${ height + 45 })` }>Price per hour in €</text>
      <text style="font-size: 12px; text-align: center" transform={ `translate(20, ${ height / 2 + 40 }) rotate(270)` }>Parking count</text>
    </svg>
    { :else }
    <p>No entries found for { name }</p>
    { /if }
  </div>
</div>

<script>
  import { scaleLinear, bin, max } from 'd3';

  import XAxis from './XAxis.svelte';
  import YAxis from './YAxis.svelte';

  export let data = [];
  export let title = '';
  export let name = '';
  export let color = '';

  let height = 180;
  let width = 300;
  let yPadding = 60;
  let xPadding = 60;
  let thresholds = [];

  $: if(data) {
    const max = Math.max(...data);
    let arr = [];
    for(let i = 0;i < max; i++) {
      arr.push(i);
    }
    thresholds = arr;
  }

  $: bins = bin().thresholds(thresholds)(data.filter(x => x < 10 && x >= 0));

  $: XProps = { height, width, xPadding, mappedData: bins.map(bin => { return { x: x(bin.x0), width: Math.max(20, x(bin.x1) - x(bin.x0) - 5), xLabel: bin.x0 } }) };
  $: YProps = { height, yTicks, y, yPadding };

  $: x = scaleLinear()
    .domain([bins[0].x0, bins[bins.length - 1].x1])
    .range([30, width - 30]);
  
  $: y = scaleLinear()
    .domain([0, max(bins, d => d.length)]).nice()
    .range([height, 0]);

  $: yTicks = y.ticks(6);
</script>