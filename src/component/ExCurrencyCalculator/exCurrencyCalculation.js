export function getOfficeByName(offices, officeName) {
  if (!offices || !officeName) {
    return null;
  }

  return offices.find((office) =>
    (office.branch_name && office.branch_name.toLowerCase() === officeName.toLowerCase()));
}

const IS_BUY = "IS_BUY";

export function calculateCurrencySum(currencyAmount, offices, operationType, officeName) {
  const centralBankData = getOfficeByName(offices, officeName);
  let currencySum = 0;

  if (centralBankData) {
    currencySum = operationType === IS_BUY
      ? currencyAmount * centralBankData.buy_price
      : currencyAmount * centralBankData.sell_price;

    return currencySum.toFixed(2);
  }

  return currencySum;
}

export function calculateCurrencyAmount(currencySum, offices, operationType, officeName) {
  const centralBankData = getOfficeByName(offices, officeName);
  let currencyAmount = 0;

  if (centralBankData && !!currencySum && (!!centralBankData.buy_price && !!centralBankData.sell_price)) {
    currencyAmount = operationType === IS_BUY
      ? Math.floor(currencySum / centralBankData.buy_price)
      : Math.floor(currencySum / centralBankData.sell_price);

    return currencyAmount;
  }

  return currencyAmount;
}