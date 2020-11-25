<Question/>
<Information/>
<DataViz/>
<DataInformation/>

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
  import Question from './components/Question.svelte';
  import Information from './components/Information.svelte';
  import DataViz from './components/DataViz.svelte';
  import DataInformation from './components/DataInformation.svelte';

  // Data
  import { selectedParkings, eZones, parkingData } from '/src/store/store';

  onMount(async () => {
    $eZones = await getData('/data/milieuzones.json');

    const dataset = await newDataset(settings.endpoints, settings.sharedKey);
    const tariffData = await getData('data/extras.json');
    
    $parkingData = await Promise.all(dataset
      .map(x => {
        const obj = x;
        obj.chargingPoints = x.chargingpointcapacity;
        obj.centerCoord = getCenterCoord(x.areageometryastext);
        obj.environmentalZone = isCoordInEnvironmentalZone(obj.centerCoord, $eZones);
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

<style lang="scss">
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: #707070;
  }
  :global(body) {
    margin: 0;
    max-width: 100vw;
    overflow-x: hidden;
    background-color: #fffaec;
  }
</style>