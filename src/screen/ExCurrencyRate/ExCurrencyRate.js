import React, { PureComponent } from "react";
import {ActivityIndicator, Text, View, StyleSheet, FlatList, ScrollView} from "react-native";
import SplashScreen from 'react-native-splash-screen'

import {getCentralBankData} from "./exCurrencyRateCalculation";
import {ExCurrencyRateItem} from "./ExCurrencyRateItem/ExCurrencyRateItem";
import ExCurrencyCalculator from "../../component/ExCurrencyCalculator";

export default class ExCurrencyRate extends PureComponent {
  componentDidMount() {
    const { loadAllOffices } = this.props;

    SplashScreen.hide();
    loadAllOffices();
  }

  getExCurrencyRateList() {
    const { offices } = this.props;
    const centralBankData = getCentralBankData(offices);

    if (!centralBankData || !centralBankData.exchange_currencies) {
      return null;
    }

    return centralBankData.exchange_currencies.map((itemData) => (
      <ExCurrencyRateItem
        key={itemData.id.toString()}
        currencyType={itemData.currency_type}
        sellPrice={itemData.exchange_currency_amounts[0].sell_price}
        buyPrice={itemData.exchange_currency_amounts[0].buy_price}
      />
    ))
  }

  render() {
    const {
      isLoading,
      filteredOffices,
      currencyAmount,
      selectedCurrency,
      currencyTypes,
      selectCurrencyType
    } = this.props;
    let exCurrencyRateList = this.getExCurrencyRateList();

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
          <ExCurrencyCalculator
            currencyTypes={currencyTypes}
            filteredOffices={filteredOffices}
            currencyAmount={currencyAmount}
            selectedCurrency={selectedCurrency}
            selectCurrencyType={selectCurrencyType}
          />

          <Text style={styles.title}>
            Forriegn Currency Rates
          </Text>

          {exCurrencyRateList}
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
  },
  title: {
    margin: 8,
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold"
  }
});