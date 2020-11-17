<svg width="100%" height="100%">
  <g class="provinces transition">
    { #each provinceData.features as province }
    <path d={pathGenerator(province)}/>
    { /each }
  </g>
</svg>

<script>
  import { onMount } from 'svelte';
  import { geoMercator, geoPath, zoom, selectAll, select, zoomIdentity } from 'd3';
  import { getData } from '../utils/helpers';

  let provinceData = { features: [] };

  $: projection = geoMercator()
      .center([4.69, 52.1])
      .scale(19000);
  $: pathGenerator = geoPath().projection(projection);

  onMount(async () => {
    provinceData = await getData('data/provinces.json');
  });
</script>