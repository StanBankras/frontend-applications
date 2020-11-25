import { writable } from 'svelte/store';
import { isCoordInMunicipality } from '/src/services/zoneservice.js';

export const selectedParkings = writable([]);
export const parkingData = writable([]);
export const selectedMunicipality = writable({});
export const eZones = writable([]);
export const filteredMunicipalities = writable([]);
export const parkingsPerMunicipality = writable([]);

let saveParkingData;

parkingData.subscribe(p => saveParkingData = p);

filteredMunicipalities.subscribe(filtered => {
  const map = {};

  saveParkingData.slice().forEach(parking => {
    const result = isCoordInMunicipality(parking.centerCoord, filtered);
    if(!map.unknown) map.unknown = [];
    if(!result) return map.unknown.push(parking.areaId);
    if(!map[result]) map[result] = [];
    return map[result].push(parking);
  });

  parkingsPerMunicipality.set(map);
});