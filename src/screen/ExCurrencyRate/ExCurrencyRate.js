import React, { PureComponent } from "react";
import {ActivityIndicator, Text, View, StyleSheet, ScrollView} from "react-native";
import SplashScreen from 'react-native-splash-screen'

import {getCentralBankData} from "../../component/ExCurrencyCalculator/exCurrencyCalculation";
import {ExCurrencyRateItem} from "./ExCurrencyRateItem/ExCurrencyRateItem";
import ExCurrencyCalculator from "../../component/ExCurrencyCalculator/ExCurrencyCalculator";

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

    return centralBankData.exchange_currencies.map((itemData, index) => {
      const backgroundColor = index % 2 !== 0 ? "#eee" : "#fff" ;

      return (
        <ExCurrencyRateItem
          key={itemData.id.toString()}
          style={{ backgroundColor }}
          currencyType={itemData.currency_type}
          buyPrice={itemData.exchange_currency_amounts[0].buy_price}
          sellPrice={itemData.exchange_currency_amounts[0].sell_price}
        />
      )
    })
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

          <View style={styles.currencyHeaderContainer}>
            <View style={styles.currencyHeaderTitle}>
              <Text style={styles.currencyHeaderTitleText}>
                Currency
              </Text>
            </View>
            <View style={styles.currencyHeaderPrice}>
              <Text style={styles.currencyHeaderPriceText}>
                Buy
              </Text>
            </View>
            <View style={styles.currencyHeaderPrice}>
              <Text style={styles.currencyHeaderPriceText}>
                Sell
              </Text>
            </View>
          </View>
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
    fontSize: 18,
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
    width: "50%",
  },
  currencyHeaderTitleText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold"
  },
  currencyHeaderPrice: {
    width: "25%",
  },
  currencyHeaderPriceText: {
    fontSize: 16,
    fontWeight: "bold"
  }
});