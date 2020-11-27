<div>
  <h3>Gemeentes met milieuzones</h3>
  <p>Klik op de naam van een gemeente of navigeer via de kaart</p>
  { #if $eZones && $eZones.length > 0 }
  <div class="buttons">
    <button
      on:click={ deselect }
      class:active={ !$selectedMunicipality }>
      Alle
    </button>
    { #each $eZones.sort((a, b) => a.municipality.localeCompare(b.municipality)) as zone }
    <button
      class:active={ $selectedMunicipality ? municipalityActive(zone.municipality) : false }
      on:click={ selectMunicipality(zone.municipality) }>
      { zone.municipality }
    </button>
    { /each }
  </div>
  { /if }
</div>

<script>
  import { eZones, filteredMunicipalities, selectedMunicipality } from '/src/store/store.js';

  function municipalityActive(name) {
    if(!$selectedMunicipality || !$selectedMunicipality.properties) return false;
    return $selectedMunicipality.properties.name.toLowerCase().replace('-', ' ') === name.toLowerCase().replace('-', ' ');
  }

  function selectMunicipality(name) {
    $selectedMunicipality = $filteredMunicipalities.features.find(m => m.properties.name.toLowerCase().replace('-', ' ')=== name.toLowerCase().replace('-', ' '));
  }

  function deselect() {
    $selectedMunicipality = undefined;
  }
</script>

<style lang="scss">
  h3 {
    margin-bottom: 0.5rem;
    font-size: 25px;
  }
  p {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    margin-bottom: 1rem;
  }
  .buttons {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    button {
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      padding: 0.5rem 1rem;
      background-color: #DDB89B;
      outline: none;
      border: 0px;
      color: white;
      font-weight: bold;
      font-size: 16px;
      cursor: pointer;
      &:hover {
        background-color: #bd977b;
      }
      &.active {
        background-color: rgb(102, 79, 61);
      }
    }
  }
</style>