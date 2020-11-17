<svg width="100%" height="100%">
  <g class="provinces">
    { #each provinceData.features as province }
    <path d={pathGenerator(province)}/>
    { /each }
  </g>
  <g class="municipalities">
    { #each filteredMunicipalities.features as municipality }
    <path d={pathGenerator(municipality)}/>
    { /each }
  </g>
  <g class="environment-zones">
    { #each environmentalZones as zone }
    <path d={pathGenerator(toGeoJson(zone))}/>
    { /each }
  </g>
  <g class="municipality-parkings">
    <circle
      v-for="parking in selectedZoneParkings"
      :key="parking.id"
      r="3"
      :cx="parking.x"
      :cy="parking.y"
      class="active"/>   
  </g> 
</svg>

<script>
  import { onMount } from 'svelte';
  import { geoMercator, geoPath, zoom, selectAll, select, zoomIdentity } from 'd3';
  import { getData } from '../utils/helpers';

  let provinceData = { features: [] };
  let municipalityData = { features: [] };
  export let environmentalZones = [];
  export let parkingData = [];
  $: eZoneNames = [...new Set((environmentalZones || []).map(x => x.municipality.toLowerCase().replace('-', ' ')))];
  $: filteredMunicipalities = {
      features: municipalityData.features
        .filter(x => eZoneNames.includes(x.properties.name.toLowerCase().replace('-', ' ')))
    }
  $: parkingsPerMunicipality = () => {
    const map = {};
    parkingData.slice().forEach(parking => {
      const result = isCoordInMunicipality(parking.centerCoord, filteredMunicipalities);
      if(!map.unknown) map.unknown = [];
      if(!result) return map.unknown.push(parking.areaId);
      if(!map[result]) map[result] = [];
      return map[result].push(parking);
    });
    return map;
  }
  $: selectedZone = undefined;
  $: selectedZoneParkings = () => {
    if(!selectedZone) return [];
    selectedZone.map(parking => {
      return {
        ezone: parking.environmentalZone,
        id: parking.areaId,
        x: this.projection(parking.centerCoord)[0],
        y: this.projection(parking.centerCoord)[1]
      }
    });
  }

  $: projection = geoMercator()
      .center([4.69, 52.1])
      .scale(19000);
  $: pathGenerator = geoPath().projection(projection);

  function toGeoJson(zone) {
    const geojson = {
      type: 'Feature',
      properties: {},
      geometry: {}
    };
    geojson.properties = {
      municipality: zone.municipality
    }
    geojson.geometry.type = zone.polygons.length > 1 ? 'MultiPolygon' : 'Polygon';
    geojson.geometry.coordinates = zone.polygons.length > 1 ? [zone.polygons] : zone.polygons;

    return geojson;
  }

  onMount(async () => {
    provinceData = await getData('data/provinces.json');
    municipalityData = await getData('data/townships.json');
  });
</script>

<style lang="scss">
  .provinces {
    fill: #ddb89b;
    stroke-width: 5px;
    stroke: #fffaec;
    cursor: grabbing;
  }
  svg {
    height: 90vh;
  }
  .environment-zones {
    pointer-events: none;
    fill: red;
  }
  .municipalities {
    path {
      stroke: black;
      stroke-width: 1px;
      fill: rgb(255 227 205);
      &:hover {
        stroke-width: 3px;
        cursor: pointer;
      }
    }
  }
</style>