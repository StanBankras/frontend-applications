import { writable, readable } from 'svelte/store';
import { isCoordInMunicipality } from '/src/services/zoneservice.js';

export const selectedParkings = writable([]);
export const parkingData = writable([]);
export const selectedMunicipality = writable([]);
export const eZones = writable([]);
export const filteredMunicipalities = writable([]);
export const parkingsPerMunicipality = writable([]);

let fMunicipalities = [];

parkingData.subscribe(p => {
  const map = {};
  p.slice().forEach(parking => {
    const result = isCoordInMunicipality(parking.centerCoord, fMunicipalities);
    if(!map.unknown) map.unknown = [];
    if(!result) return map.unknown.push(parking.areaId);
    if(!map[result]) map[result] = [];
    return map[result].push(parking);
  });
  parkingsPerMunicipality.set(map);
});

filteredMunicipalities.subscribe(m => fMunicipalities = m);