<Map/>

<script>
  // Svelte
  import { onMount } from 'svelte';

  // Utils
  import { getData } from './utils/helpers';
  import { settings } from './utils/settings';
  import { newDataset } from './utils/mergedata';
  import { getCenterCoord, isCoordInEnvironmentalZone } from './services/zoneservice';
  import { getNpropendata } from './services/nprservice';

  // Components
  import Map from './components/Map.svelte';

  // Data
  let parkingData = [];
  let environmentalZones = [];

  onMount(async () => {
    environmentalZones = await getData('/data/milieuzones.json');
    const dataset = await newDataset(settings.endpoints, settings.sharedKey);
    const tariffData = await getData('data/extras.json');
    
    parkingData = await Promise.all(dataset
      .map(x => {
        const obj = x;
        obj.centerCoord = getCenterCoord(x.areageometryastext);
        obj.environmentalZone = isCoordInEnvironmentalZone(obj.centerCoord, environmentalZones);
        return obj;
      })
      .map(async (x) => {
        const obj = x;
        const npropendata = await getNpropendata(obj.areaid, tariffData);
        obj.tariffs = npropendata.tariffs;
        obj.specifications = npropendata.specifications;
        obj.overallAverageTariff = Object.values(obj.tariffs || [])
          .map(x => x.averageTariff)
          .reduce((prev, cur) => prev + cur, 0) / Object.keys(obj.tariffs || []).length;

        return obj;
      }));
  });
</script>