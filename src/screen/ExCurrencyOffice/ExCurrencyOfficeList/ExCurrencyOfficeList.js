import React, { PureComponent } from "react";
import {StyleSheet, Text, View} from "react-native";

import ExCurrencyOfficeItem from "./ExCurrencyOfficeItem/ExCurrencyOfficeItem";

export default class ExCurrencyOfficeList extends PureComponent {
  getListOfOffices() {
    const { filteredOffices } = this.props;

    if (!filteredOffices) {
      return null;
    }

    return filteredOffices.map((office) => (
      <ExCurrencyOfficeItem
        key={office.id}
        {...office}
      />
    ));
  }

  render() {
    const listOfOffice = this.getListOfOffices();

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Exchange offices
        </Text>
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
    fontSize: 18,
    fontWeight: "bold"
  },
});
