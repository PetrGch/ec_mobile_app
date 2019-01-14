import React, { PureComponent } from "react";
import {ActivityIndicator, View, StyleSheet, ScrollView} from "react-native";

import ExCurrencyOfficeCalculator from "./ExCurrencyOfficeCalculator/ExCurrencyOfficeCalculator";
import ExCurrencyOfficeList from "./ExCurrencyOfficeList/ExCurrencyOfficeList";

export const CURRENCY_OPERATION_TYPE = {
  IS_BUY: "IS_BUY",
  IS_SELL: "IS_SELL"
};

export default class ExCurrencyOffice extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      operationType: CURRENCY_OPERATION_TYPE.IS_BUY
    };

    this.selectOperationType = this.selectOperationType.bind(this);
  }

  selectOperationType(type) {
    const { operationType } = this.state;

    if (type !== operationType) {
      this.setState({
        operationType: type
      });
    }
  }

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
    const { operationType } = this.state;

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
            operationType={operationType}
            selectOperationType={this.selectOperationType}
          />
          <ExCurrencyOfficeList
            operationType={operationType}
            filteredOffices={filteredOffices}
            currencyAmount={currencyAmount}
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