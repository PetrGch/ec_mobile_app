import React, { PureComponent } from "react";
import {StyleSheet, Text, View} from "react-native";

import ExCurrencyOfficeItem from "./ExCurrencyOfficeItem/ExCurrencyOfficeItem";
import {CURRENCY_OPERATION_TYPE} from "../ExCurrencyOffice";

export default class ExCurrencyOfficeList extends PureComponent {
  getListOfOffices() {
    const { filteredOffices, operationType, currencyAmount } = this.props;

    if (!filteredOffices) {
      return null;
    }

    return filteredOffices.map((office, index) => {
      const backgroundColor = index % 2 !== 0 ? "#eee" : "#fff" ;

      return (
        <ExCurrencyOfficeItem
          key={office.id}
          operationType={operationType}
          currencyAmount={currencyAmount}
          style={{ backgroundColor }}
          {...office}
        />
      )
    });
  }

  render() {
    const { operationType } = this.props;
    const listOfOffice = this.getListOfOffices();
    const priceTitle = operationType === CURRENCY_OPERATION_TYPE.IS_BUY ? "Buy" : "Sell";

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Exchange offices
        </Text>
        <View style={styles.currencyHeaderContainer}>
          <View style={styles.currencyHeaderTitle}>
            <Text style={styles.currencyHeaderTitleText}>
              Office name
            </Text>
          </View>
          <View style={styles.currencyHeaderPrice}>
            <Text style={styles.currencyHeaderPriceText}>
              {priceTitle}
            </Text>
          </View>
          <View style={styles.currencyHeaderAmount}>
            <Text style={styles.currencyHeaderPriceText}>
              Amount
            </Text>
          </View>
        </View>
        {listOfOffice}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1
  },
  title: {
    margin: 8,
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold"
  },
  currencyHeaderContainer: {
    width: "100%",
    height: 40,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eee"
  },
  currencyHeaderTitle: {
    flexDirection: "row",
    alignItems: "center",
    width: "55%",
  },
  currencyHeaderTitleText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "bold"
  },
  currencyHeaderPrice: {
    width: "20%"
  },
  currencyHeaderAmount: {
    width: "25%"
  }
});
