import React, { PureComponent } from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import { Navigation } from "react-native-navigation";

import ExCurrencyCalculator from "../../component/ExCurrencyCalculator/ExCurrencyCalculator";
import ExCurrencyOfficeMap from "../ExCurrencyOfficeMap/ExCurrencyOfficeMap";

export default class ExCurrencyOfficeInfo extends PureComponent {
  constructor(props) {
    super(props);

    Navigation.events().bindComponent(this);
  }

  componentDidDisappear() {
    const { componentId } = this.props;

    Navigation
      .pop(componentId)
      .catch((ex) => {
        console.log(ex)
      });
  }

  render() {
    const {
      branchName,
      companyName,
      currencyTypes,
      filteredOffices,
      currencyAmount,
      selectedCurrency,
      lat,
      lng,
      googleMapUrl,

      selectCurrencyType,
      setCurrencyAmount
    } = this.props;

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.officeName}>Office name: {companyName}</Text>
            <Text style={styles.branchName}>Branch name: {branchName}</Text>
          </View>

          <ExCurrencyCalculator
            officeName={branchName}
            currencyTypes={currencyTypes}
            filteredOffices={filteredOffices}
            currencyAmount={currencyAmount}
            selectedCurrency={selectedCurrency}
            selectCurrencyType={selectCurrencyType}
            setCurrencyAmount={setCurrencyAmount}
          />
        </View>
        <View style={styles.map}>
          <ExCurrencyOfficeMap
            centerLat={parseFloat(lat)}
            centerLong={parseFloat(lng)}
            googleMapUrl={googleMapUrl}
            markers={[{ latitude: parseFloat(lat), longitude: parseFloat(lng) }]}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    margin: 8,
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold"
  },
  header: {
    margin: 8,
  },
  officeName: {
    fontSize: 16,
    fontWeight: "bold"
  },
  branchName: {
    fontSize: 14,
  },
  map: {
    margin: 8,
  }
});
