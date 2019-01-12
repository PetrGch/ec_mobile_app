import React, { PureComponent } from "react";
import {ActivityIndicator, View, StyleSheet, ScrollView} from "react-native";

import ExCurrencyOfficeCalculator from "./ExCurrencyOfficeCalculator/ExCurrencyOfficeCalculator";
import ExCurrencyOfficeList from "./ExCurrencyOfficeList/ExCurrencyOfficeList";

export default class ExCurrencyOffice extends PureComponent {
  render() {
    const {
      isLoading,
      filteredOffices,
      currencyAmount,
      selectedCurrency,
      currencyTypes,

      selectCurrencyType,
      setCurrencyAmount
    } = this.props;

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <ExCurrencyOfficeCalculator
            currencyTypes={currencyTypes}
            filteredOffices={filteredOffices}
            currencyAmount={currencyAmount}
            selectedCurrency={selectedCurrency}
            selectCurrencyType={selectCurrencyType}
            setCurrencyAmount={setCurrencyAmount}
          />
          <ExCurrencyOfficeList
            filteredOffices={filteredOffices}
          />
        </View>
      </ScrollView>
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