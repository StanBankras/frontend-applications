export async function getNpropendata(areaId, data) {
  if (data.find(x => x.areaId === areaId)) return data.find(x => x.areaId === areaId);
  return {};
} 

function formatTariffData(tariffs) {
  const tariffObj = {};

  tariffs.forEach(tariff => {
    if (notExpiredTariff(tariff)) {
      tariff.validityDays.forEach(day => {
        const dayKey = day.split(' ').join('').toLowerCase();
        if (tariffObj[dayKey]) return;
        tariffObj[dayKey] = {
          validFrom: tariff.validityFromTime,
          validUntil: tariff.validityUntilTime,
          rateInterval: tariff.rateIntervals,
          averageTariff: getAverageTariffPerMinute(tariff)
        };
      });
    }
  });

  return tariffObj;
}

// Returns boolean true if tariff is currently valid
function notExpiredTariff(tariff) {
  return tariff.startOfPeriod * 1000 < Date.now() && (tariff.endOfPeriod * 1000 > Date.now() || !tariff.endOfPeriod || tariff.endOfPeriod === -1);
}

// To-do: add other time formats (seconds, hours)
function getAverageTariffPerMinute(tariff) {
  if (!tariff.intervalRates) return null;

  const minutesInDay = 1440;
  let weightedTotalCharge = 0;
  let totalMinutes = 0;

  tariff.intervalRates.forEach(rate => {
    const minutes = rate.durationUntil === -1 ? minutesInDay - rate.durationFrom : rate.durationUntil - rate.durationFrom;
    const charge = rate.charge
    const chargePeriod = rate.chargePeriod;
    const weightedCharge = charge * minutes / chargePeriod;
    weightedTotalCharge += weightedCharge;
    totalMinutes += minutes;
  });

  return weightedTotalCharge / totalMinutes;
}

export default { formatTariffData, notExpiredTariff, getAverageTariffPerMinute, getNpropendata }