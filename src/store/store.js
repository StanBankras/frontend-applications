import { readable, writable } from 'svelte/store';
import { fetchEnvironmentalZones, isCoordInEnvironmentalZone, getCenterCoord } from '../services/zoneservice';
import { settings } from './settings';
import { newDataset } from '../utils/mergedata';
import { getNpropendata } from '../services/nprservice';


export const count = writable(0);
export const parkingData = readable('test');

async function getParkingData() {
  const dataset = newDataset(settings.endpoints, settings.sharedKey);

  const requestedData = await Promise.all([fetchEnvironmentalZones(), dataset]);
  const data = requestedData[1];
  const environmentalZones = requestedData[0];

  commit('SET_ENVIRONMENT_ZONES', environmentalZones)

  const filteredData = data
    .filter(x => Object.keys(settings.keys).every(key => {
      if (settings.strictKeys) return Object.prototype.hasOwnProperty.call(x, key); // https://stackoverflow.com/a/41439924
      return true;
    }))
    .map(x => {
      const obj = {};
      Object.keys(settings.keys).forEach(key => {
        return obj[settings.keys[key]] = (x[key] || undefined);
      });
      return obj;
    })
    .map(x => {
      const obj = x;
      obj.centerCoord = getCenterCoord(x.area);
      obj.environmentalZone = isCoordInEnvironmentalZone(obj.centerCoord, environmentalZones);
      return obj;
    })
    .map(async (x) => {
      const obj = x;
      const npropendata = await getNpropendata(obj.areaId);
      obj.tariffs = npropendata.tariffs;
      obj.specifications = npropendata.specifications;
      obj.overallAverageTariff = Object.values(obj.tariffs || [])
        .map(x => x.averageTariff)
        .reduce((prev, cur) => prev + cur, 0) / Object.keys(obj.tariffs || []).length;

      return obj;
    });

  return await Promise.all(filteredData);
}