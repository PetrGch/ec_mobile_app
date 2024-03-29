import React from "react";
import {Text, View, StyleSheet} from "react-native";
import Flag from 'react-native-flags';

import {currencyMarks} from "../../../component/util/currencyMark";
import {parseToNumber} from "../../../component/util/validator";

export function ExCurrencyRateItem({ currencyType, sellPrice, buyPrice, style }) {
  const currencyMark = currencyMarks[currencyType];

  return (
    <View style={[styles.container, style]}>
      <View style={styles.title}>
        <Flag
          size={48}
          code={currencyType.slice(0, 2)}
        />
        <Text style={styles.titleText}>
          {currencyType}
        </Text>
      </View>
      <View style={styles.price}>
        <Text style={styles.priceText}>
          {parseToNumber(buyPrice).toFixed(2)} {currencyMark}
        </Text>
      </View>
      <View style={styles.price}>
        <Text style={styles.priceText}>
          {parseToNumber(sellPrice).toFixed(2)} {currencyMark}
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
    fontSize: 14
  },
  price: {
    width: "25%",
  },
  priceText: {
    fontSize: 14
  }
});
