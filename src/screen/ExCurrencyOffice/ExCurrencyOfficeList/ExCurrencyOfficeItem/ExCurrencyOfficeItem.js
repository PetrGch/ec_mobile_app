import React from "react";
import {Text, View, StyleSheet} from "react-native";

export default function ExCurrencyOfficeItem({ company_name, branch_name }) {
  return (
    <View style={styles.container}>
      <Text>{company_name}</Text>
      <Text>{branch_name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  }
});
