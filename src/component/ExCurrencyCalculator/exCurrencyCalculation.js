export function getCentralBankData(offices) {
  if (!offices) {
    return null;
  }

  return offices.find((office) => office.is_central_bank);
}

const IS_BUY = "IS_BUY";

export function calculateCurrencySum(currencyAmount, offices, operationType) {
  const centralBankData = getCentralBankData(offices);
  let currencySum = "0.00";

  if (centralBankData) {
    currencySum = operationType === IS_BUY
      ? currencyAmount * centralBankData.buy_price
      : currencyAmount * centralBankData.sell_price;

    return currencySum.toFixed(2).toString();
  }

  return currencySum;
}

export function calculateCurrencyAmount(currencySum, offices, operationType) {
  const centralBankData = getCentralBankData(offices);
  let currencyAmount = "0";

  if (centralBankData) {
    currencyAmount = operationType === IS_BUY
      ? Math.round(currencySum / centralBankData.buy_price)
      : Math.round(currencySum / centralBankData.sell_price);

    return currencyAmount.toString();
  }

  return currencyAmount;
}