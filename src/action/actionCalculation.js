export function prepopulateCurrencyType(companies) {
  let currencyTypes = [];
  let mainCurrencyType = ['EUR', 'USD', 'GBP'];

  companies.forEach(company => {
    company.exchange_currencies.forEach(currency => {
      const currencyIndex = currencyTypes.indexOf(currency.currency_type);
      const mainCurrencyIndex = mainCurrencyType.indexOf(currency.currency_type);
      if (currencyIndex === -1 && mainCurrencyIndex === -1) {
        currencyTypes.push(currency.currency_type);
      }
    })
  });

  const mappedCurrencyTypes = currencyTypes
    .filter(currencyType => !!currencyType)
    .map(currencyType => ({index: currencyType, value: currencyType}))
    .sort((a, b) => a.value >= b.value ? 1 : -1);
  const mappedMainCurrencyTypes = mainCurrencyType
    .map(currencyType => ({index: currencyType, value: currencyType}));

  return mappedMainCurrencyTypes.concat(mappedCurrencyTypes);
}