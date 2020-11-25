<div>
  { #if $selectedParkings && $selectedParkings.length > 0 && $selectedMunicipality }
  <h3>Stats for all parkings in { $selectedMunicipality.properties.name }</h3>
  { :else }
  <h3>Stats for all parkings in municipalities with an environmental zone</h3>
  { /if }
  { #if $parkingData && $parkingData.length > 0 }
  Charts
  { :else }
  <div class="loader">
    <img src="/img/loader.svg" alt="loader">
  </div>
  { /if }
</div>

<script>
  import { selectedParkings, selectedMunicipality, parkingData } from '/src/store/store.js';
</script>

<style lang="scss">
  h3 {
    margin-bottom: 0.5rem;
    font-size: 25px;
  }
</style>