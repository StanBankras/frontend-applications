<g class="environment-zones">
  { #each $eZones as zone }
  <path
    d={pathGenerator(toGeoJson(zone))}
    class:active={
      $selectedMunicipality && $selectedMunicipality.properties ? zone.municipality.toLowerCase().replace('-', ' ') === $selectedMunicipality.properties.name.toLowerCase().replace('-', ' ') : false 
    }/>
  { /each }
</g>

<script>
  import { eZones, selectedMunicipality } from '/src/store/store.js';
  export let pathGenerator = undefined;

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
</script>

<style lang="scss">
  .environment-zones {
    fill: rgb(16, 202, 16);
    transition: .3s ease-in-out;
    pointer-events: none;
    .active {
      fill: transparent;
      stroke-width: 3px;
      stroke: rgb(0, 0, 0);
    }
  }
</style>