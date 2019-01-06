import {currencyMarks} from "../util/currencyMark";

function filterAmounts(currency, currencyAmount) {
  let buy_price = 0;
  let buy_trend = 0;
  let sell_price = 0;
  let sell_trend = 0;
  let updated_at = null;

  if (currency && currency.exchange_currency_amounts
    && currency.exchange_currency_amounts.length !== 0) {
    currency.exchange_currency_amounts.forEach(amount => {
      updated_at = amount.updated_at;
      if (amount.currency_amount_from && amount.currency_amount_to) {
        if (currencyAmount >= parseInt(amount.currency_amount_from)
          && currencyAmount <= parseInt(amount.currency_amount_to)) {
          buy_price = amount.buy_price;
          buy_trend = amount.buy_trend;
          sell_price = amount.sell_price;
          sell_trend = amount.sell_trend;
        }
      }
      if (amount.currency_amount_from && !amount.currency_amount_to) {
        if (currencyAmount >= parseInt(amount.currency_amount_from)) {
          buy_price = amount.buy_price;
          buy_trend = amount.buy_trend;
          sell_price = amount.sell_price;
          sell_trend = amount.sell_trend;
        } else if (!buy_price && !sell_price && currencyAmount < parseInt(amount.currency_amount_from)) {
          buy_price = 0;
          sell_price = 0;
        }
      }
    })
  }

  return {
    buy_price,
    buy_trend,
    sell_price,
    sell_trend,
    updated_at
  }
}

export function filterCurrency(record, currencyType, currencyAmount) {
  let filteredRecord = null;
  if (record.exchange_currencies.length !== 0) {
    record.exchange_currencies.some(currency => {
      if (currency.currency_type === currencyType) {
        const filteredAmount = filterAmounts(currency, currencyAmount);
        filteredRecord = {
          id: record.id,
          uuid: record.uuid,
          currencyMark: currencyMarks[currencyType] || "",
          workingTime: record.exchange_company_working_time,
          company_name: record.company_name,
          branch_name: record.branch_name,
          is_central_bank: record.is_central_bank,
          lat: record.lat,
          lng: record.lng,
          buy_price: filteredAmount.buy_price,
          buy_trend: filteredAmount.buy_trend,
          sell_price: filteredAmount.sell_price,
          sell_trend: filteredAmount.sell_trend,
          updated_at: filteredAmount.updated_at,
          address: record.address,
          google_map_url: record.google_map_url
        };
        return true;
      }
      return false
    })
  }

  return filteredRecord;
}

export function filterByCurrency(records, currencyType, currencyAmount) {
  const filteredRecords = [];
  if (records && currencyType) {
    records.forEach(record => {
      const filteredRecord = filterCurrency(record, currencyType, currencyAmount);
      if (filteredRecord) {
        filteredRecords.push(filteredRecord);
      }
    });
  }

  return filteredRecords;
}
