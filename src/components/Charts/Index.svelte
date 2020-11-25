<div>
  { #if $selectedParkings && $selectedParkings.length > 0 && $selectedMunicipality }
  <h3>Stats for all parkings in { $selectedMunicipality.properties.name }</h3>
  { :else }
  <h3>Stats for all parkings in municipalities with an environmental zone</h3>
  { /if }
</div>

<script>
  import { selectedParkings, selectedMunicipality } from '/src/store/store.js';
</script>

<style lang="scss">
  h3 {
    margin-bottom: 0.5rem;
    font-size: 25px;
  }
</style>