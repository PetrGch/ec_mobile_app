import React, { PureComponent } from "react";
import {ActivityIndicator, View, StyleSheet} from "react-native";

import ExCurrencyOfficeCalculator from "./ExCurrencyOfficeCalculator/ExCurrencyOfficeCalculator";

export default class ExCurrencyOffice extends PureComponent {
  render() {
    const {
      isLoading,
      filteredOffices,
      currencyAmount,
      selectedCurrency,
      currencyTypes,
      selectCurrencyType
    } = this.props;

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <ExCurrencyOfficeCalculator
          currencyTypes={currencyTypes}
          filteredOffices={filteredOffices}
          currencyAmount={currencyAmount}
          selectedCurrency={selectedCurrency}
          selectCurrencyType={selectCurrencyType}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1
  }
});