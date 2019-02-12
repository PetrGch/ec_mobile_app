import React from "react";
import {Text, View, StyleSheet} from "react-native";

export default function ExCurrencyHomeHeader({ centralBankData }) {
  return centralBankData && centralBankData.source_of_data_eng ? (
    <View style={styles.container}>
      <Text style={styles.title}>{centralBankData.source_of_data_eng}</Text>
      <Text style={styles.subTitle}>{centralBankData.title_eng}</Text>
      <Text>{centralBankData.subtitle_eng}</Text>
      <Text>{centralBankData.currency_name_eng}</Text>
      <Text>Last update: {centralBankData.last_updated}</Text>
    </View>
  ) : null;
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
