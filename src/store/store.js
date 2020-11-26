import { writable, derived } from 'svelte/store';
import { isCoordInMunicipality } from '/src/services/zoneservice.js';

export const selectedParkings = writable([]);
export const parkingData = writable([]);
export const selectedMunicipality = writable({});
export const eZones = writable([]);
export const filteredMunicipalities = writable([]);
export const parkingsPerMunicipality = derived([parkingData, filteredMunicipalities], ([$parkingData, $filteredMunicipalities]) => {
  const map = {};

  $parkingData.slice().forEach(parking => {
    const result = isCoordInMunicipality(parking.centerCoord, $filteredMunicipalities);
    if(!map.unknown) map.unknown = [];
    if(!result) return map.unknown.push(parking.areaId);
    if(!map[result]) map[result] = [];
    return map[result].push(parking);
  });

  return map;
}, {});