import inside from 'point-in-polygon';
import { replaceMultipleOccurences } from '../utils/helpers';

export function getCenterCoord(coordinates) {
  if(!coordinates) return [];
  const type = coordinates.split(' ')[0];
  let longLat = replaceMultipleOccurences(coordinates, [type + ' (', '(', ')', ','], '').split(' ');
  if(type === 'POINT') {
    longLat = [ Number(longLat[0]), Number(longLat[1]) ];
  } else {
    let latTotal = 0;
    let longTotal = 0;

    longLat.forEach((x, index) => {
      if(index === 0 || index % 2 === 0) return longTotal += Number(x);
      return latTotal += Number(x);
    });

    longLat = [ longTotal / (longLat.length / 2), latTotal / (longLat.length / 2) ];
  }

  return longLat;
}

export function getCenterCoordFromPolygon(polygon) {
  let latTotal = polygon.reduce((acc, curr) => acc + curr[1], 0);
  let longTotal = polygon.reduce((acc, curr) => acc + curr[0], 0);

  return [ longTotal / (polygon.length), latTotal / (polygon.length) ];
}

export function isCoordInEnvironmentalZone(centerCoord, geojson) {
  const polygons = geojson;
  let zone = undefined;
  for(let i = 0;i < polygons.length;i++) {
    if(inside(centerCoord, polygons[i].polygons[0])) {
      zone = polygons[i].municipality; 
      break;
    }
  }
  return zone;
}

function getMunicipalityZones(zones) {
  const polygons = [];
  if(!zones) return [];
  zones.forEach(zone => {
    if(zone.geometry.type === 'MultiPolygon') {
      zone.geometry.coordinates.forEach(coordinateArray => {
        polygons.push({ municipality: zone.properties.name, polygon: coordinateArray });
      });      
    } else {
      polygons.push({ municipality: zone.properties.name, polygon: zone.geometry.coordinates })
    }
  });
  return polygons;
}

export function isCoordInMunicipality(centerCoord, geojson) {
  const polygons = getMunicipalityZones(geojson.features);
  let zone = undefined;
  for(let i = 0;i < polygons.length;i++) {
    if(inside(centerCoord, polygons[i].polygon[0])) {
      zone = polygons[i].municipality; 
      break;
    }
  }
  return zone;
}