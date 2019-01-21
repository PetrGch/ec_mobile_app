import React from "react";
import {StyleSheet, Text, View} from "react-native";

function RangeList({ selectedCurrency, selectedOffice, currencyMark }) {
  const selectedCurrencyRange = selectedOffice.exchange_currencies.find((currency) =>
    currency.currency_type === selectedCurrency);

  if (!selectedCurrencyRange || !selectedCurrencyRange.exchange_currency_amounts) {
    return null;
  }

  return selectedCurrencyRange.exchange_currency_amounts.map((amount, index) => {
    const backgroundColor = index % 2 !== 0 ? "#eee" : "#fff" ;

    return (
      <View key={styles.amountItem} style={[styles.amountItem, { backgroundColor }]}>
        <Text style={styles.amountItemRange}>{amount.currency_amount}{currencyMark}</Text>
        <Text style={styles.amountItemBuy}>{amount.buy_price}{currencyMark}</Text>
        <Text style={styles.amountItemSell}>{amount.sell_price}{currencyMark}</Text>
      </View>
    );
  })
}

export default function ExCurrencyOfficeRange({ selectedCurrency, selectedOffice, currencyMark }) {
  if (!selectedCurrency || !selectedOffice || !selectedOffice.exchange_currencies) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency range</Text>
      <View style={[styles.amountItem, { backgroundColor: "#eee" }]}>
        <Text style={styles.amountItemRange}>Range {currencyMark}</Text>
        <Text style={styles.amountItemBuy}>Buy {currencyMark}</Text>
        <Text style={styles.amountItemSell}>Sell {currencyMark}</Text>
      </View>
      <RangeList
        selectedCurrency={selectedCurrency}
        selectedOffice={selectedOffice}
        currencyMark={currencyMark}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: "#eee"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold"
  },
  amountItem: {
    flexDirection: "row"
  },
  amountItemRange: {
    width: "50%"
  },
  amountItemBuy: {
    width: "25%"
  },
  amountItemSell: {
    width: "25%"
  }
});
