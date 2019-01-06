import React from "react";
import {Text, View, StyleSheet} from "react-native";
import Flag from 'react-native-flags';

import {currencyMarks} from "../../../util/currencyMark";
import {numberValidator} from "../../../util/validator";

export function ExCurrencyRateItem({ currencyType, sellPrice, buyPrice }) {
  const currencyMark = currencyMarks[currencyType];

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Flag
          code={currencyType.slice(0, 2)}
        />
        <Text style={styles.titleText}>
          {currencyType}
        </Text>
      </View>
      <View style={styles.price}>
        <Text style={styles.priceText}>
          {numberValidator(sellPrice).toFixed(2)} {currencyMark}
        </Text>
      </View>
      <View style={styles.price}>
        <Text style={styles.priceText}>
          {numberValidator(buyPrice).toFixed(2)} {currencyMark}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "#eee"
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  titleText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "bold"
  },
  price: {
    width: "25%",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold"
  }
});
