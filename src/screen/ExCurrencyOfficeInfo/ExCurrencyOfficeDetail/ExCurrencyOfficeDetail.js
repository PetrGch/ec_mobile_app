import React, { PureComponent } from "react";
import {Text, View, StyleSheet} from "react-native";

export default class ExCurrencyOfficeDetail extends PureComponent {
  render() {
    const { address } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.detailTitle}>Details</Text>
        <View style={styles.detailItem}>
          <Text style={styles.detailItemKey}>Address: </Text>
          <Text style={styles.detailItemValue}>{address || "-//-"}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    marginTop: 0,
  },
  detailTitle: {
    marginTop: 10,
    marginBottom: 6,
    fontSize: 16,
    fontWeight: "bold"
  },
  detailItem: {
    width: "100%",
    flexDirection: "row"
  },
  detailItemKey: {
    width: 90,
    fontWeight: "bold"
  },
  detailItemValue: {
    flex: 1
  }
});
