import {distance} from "../../../component/util/geolocation";
import {CURRENCY_OPERATION_TYPE} from "../ExCurrencyOffice";
import moment from "moment";

export function sortByGeolocation(offices, lat, lng) {
  return offices.map(record => {
    if (record.lat && record.lng) {
      return {...record, distance: distance(lat, lng, record.lat, record.lng, "K")}
    }

    return {...record, distance: Infinity};
  }).sort((itemA, itemB) => {
    console.log( itemA.distance - itemB.distance);
    return  itemA.distance - itemB.distance
  });
}

export function sortedOfficesByName(offices) {
  return offices.sort((a, b) => {
    return a.branch_name > b.branch_name ? 1 : -1;
  })
}

export function sortedOfficesBtLowPrice(offices, operationType) {
  return offices.sort((a, b) => {
    if (operationType === CURRENCY_OPERATION_TYPE.IS_BUY) {
      return a.buy_price - b.buy_price;
    }
    return a.sell_price - b.sell_price;
  })
}

export function sortedOfficesByHighPrice(offices, operationType) {
  return offices.sort((a, b) => {
    if (operationType === CURRENCY_OPERATION_TYPE.IS_BUY) {
      return b.buy_price - a.buy_price;
    }
    return b.sell_price - a.sell_price
  })
}

export function filterOfficesByName(offices, filterPattern) {
  const regExp = RegExp(filterPattern.toLowerCase());

  return offices.filter(office => regExp.test(office.company_name.toLowerCase())
    || regExp.test(office.branch_name.toLowerCase()));
}

function findWorkingDay(workingTimeList) {
  const dayOfWeek = moment().format("e");
  if (!workingTimeList) {
    return null
  }

  switch (dayOfWeek) {
    case "0":
      return { from: workingTimeList.sn_from, to: workingTimeList.sn_to };
    case "1":
      return { from: workingTimeList.mn_from, to: workingTimeList.mn_to };
    case "2":
      return { from: workingTimeList.tu_from, to: workingTimeList.tu_to };
    case "3":
      return { from: workingTimeList.we_from, to: workingTimeList.we_to };
    case "4":
      return { from: workingTimeList.th_from, to: workingTimeList.th_to };
    case "5":
      return { from: workingTimeList.fr_from, to: workingTimeList.fr_to };
    case "6":
      return { from: workingTimeList.st_from, to: workingTimeList.st_to };
    default:
      return null;
  }
}

export function findWorkingTimeOfCurrentDay(workingTime) {
  const workingDayTime = findWorkingDay(workingTime);
  return isWorkingNow(workingDayTime);
}

function isWorkingNow(workingDayTime) {
  if (!workingDayTime
    || !moment(workingDayTime.from, "HH:mm").isValid()
    || !moment(workingDayTime.to, "HH:mm").isValid()) {
    return null;
  }
  const utcFrom = moment.utc(workingDayTime.from, "HH:mm");
  const utcTo = moment.utc(workingDayTime.to, "HH:mm");

  const startTime = moment(utcFrom).local().valueOf();
  const endTime = moment(utcTo).local().valueOf();
  const currentTime = moment().local().valueOf();

  return startTime <= currentTime && currentTime < endTime;
}

