<section>
  <div id="map">
    { #await $parkingData }
    <div class="loader-container" v-else>
      <img src="/src/assets/img/loader.svg" alt="loader">
    </div>
    { :then data }
    <div class="map">
      <Map/>
    </div>
    { /await }
  </div>
</section>

<script>
  import { parkingData } from '/src/store/store.js';

  import Map from '/src/components/Map/Index.svelte';
</script>

<style lang="scss">
  section {
    height: 100vh;
    padding: 5rem 0;
  }
  #map {
    width: 1000px;
    height: 100%;
    .map {
      height: 100%;
    }
  }
  .loader-container {
    width: 100%;
    height: 100%;
    min-height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>