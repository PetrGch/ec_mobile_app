import React from "react";
import {Text, View, StyleSheet} from "react-native";

export default function ExCurrencyHomeHeader({ source, title, subTitle, lastUpdate, currencyName }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{source}</Text>
      <Text style={styles.subTitle}>{title}</Text>
      <Text>{subTitle}</Text>
      <Text>{currencyName}</Text>
      <Text>Last update: {lastUpdate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginHorizontal: 8
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  subTitle: {
    marginBottom: 10,
    fontWeight: "bold"
  }
});
