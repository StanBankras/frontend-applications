<section>
  <div id="map">
    <Map/>
  </div>
  <div>
    <SelectZone/>
    <Charts/>
  </div>
</section>

<script>
  import Map from '/src/components/Map/Index.svelte';
  import SelectZone from '/src/components/SelectZone.svelte';
  import Charts from '/src/components/Charts/Index.svelte';
</script>

<style lang="scss">
  section {
    height: 100vh;
    padding: 5rem 0;
    display: grid;
    grid-template-columns: 5fr 4fr;
    grid-gap: 2rem;
  }
</style>