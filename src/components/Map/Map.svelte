<svg width="100%" height="100%">
  <Provinces bind:pathGenerator bind:provinceData/>
  <Municipalities bind:pathGenerator bind:municipalityData/>
  <SelectedParkings bind:projection/>
  <EnvironmentZones bind:pathGenerator/>
</svg>
<Labels/>

<script>
  import { onMount } from 'svelte';
  import { geoMercator, geoPath } from 'd3';
  import { getData } from '/src/utils/helpers';
  import { getCenterCoordFromPolygon } from '/src/services/zoneservice';

  import { selectedMunicipality } from '/src/store/store';

  import Labels from './Labels.svelte';
  import EnvironmentZones from './EnvironmentZones.svelte';
  import SelectedParkings from './SelectedParkings.svelte';
  import Municipalities from './Municipalities.svelte';
  import Provinces from './Provinces.svelte';

  let provinceData = { features: [] };
  let municipalityData = { features: [] };

  let centerPoint = [4.69, 52.1];
  $: if($selectedMunicipality && $selectedMunicipality.geometry) {
    centerPoint = getCenterCoordFromPolygon($selectedMunicipality.geometry.coordinates[0][0]);
  } else {
    centerPoint = [4.69, 52.1];
  }

  $: projection = geoMercator()
      .center(centerPoint)
      .scale($selectedMunicipality ? 50000 : 19000);
  $: pathGenerator = geoPath().projection(projection);

  onMount(async () => {
    provinceData = await getData('data/provinces.json');
    municipalityData = await getData('data/townships.json');
  });
</script>

<style lang="scss">
  :global(*) {
    transition: .5s ease-in-out;
  }
</style>