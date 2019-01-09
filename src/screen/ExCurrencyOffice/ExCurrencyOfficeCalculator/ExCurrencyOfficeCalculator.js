import React, { PureComponent } from "react";
import { StyleSheet, Text, View, Picker, TextInput } from "react-native";

import {Radio} from "../../../component/lib";

const IS_BUY = "IS_BUY";
const IS_SELL = "IS_SELL";
const { Item } = Picker;

function getPickerItems(currencyTypes) {
  if (!currencyTypes) {
    return null;
  }
  return currencyTypes.map((currencyItem) => (
    <Item
      key={currencyItem.index}
      label={currencyItem.index}
      value={currencyItem.value}
    />
  ))
}

export default class ExCurrencyOfficeCalculator extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      operationType: IS_BUY,
      currencyAmount: "100",
    };

    this.selectCurrencyType = this.selectCurrencyType.bind(this);
    this.selectOperationType = this.selectOperationType.bind(this);
    this.changeCurrencyAmount = this.changeCurrencyAmount.bind(this);
  }

  selectCurrencyType(itemValue) {
    const { selectCurrencyType } = this.props;

    selectCurrencyType(itemValue);
  }

  selectOperationType(type) {
    const { operationType } = this.state;

    if (type !== operationType) {
      this.setState({
        operationType: type,
      });
    }
  }

  changeCurrencyAmount(value) {
    this.setState({
      currencyAmount: value
    });
  }

  render() {
    const { currencyTypes, selectedCurrency } = this.props;
    const { operationType, currencyAmount } = this.state;
    const pickerItem = getPickerItems(currencyTypes);

    if (!currencyTypes) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Currency Calculator</Text>
        <View style={styles.optionsPanel}>
          <View style={styles.dropDownPickerWrapper}>
            <Picker
              selectedValue={selectedCurrency}
              style={styles.dropDownPicker}
              itemStyle={{ backgroundColor: "red" }}
              mode={"dropdown"}
              onValueChange={this.selectCurrencyType}>
              {pickerItem}
            </Picker>
          </View>

          <View style={styles.sellBuyOption}>
            <View style={[styles.sellBuyOptionItem, { marginLeft: 8}]}>
              <Radio
                value={IS_BUY}
                selected={operationType === IS_BUY}
                onPress={this.selectOperationType}
              />
              <Text style={styles.sellBuyOptionItemText}>Buy</Text>
            </View>
            <View style={[styles.sellBuyOptionItem, { marginRight: 8}]}>
              <Radio
                value={IS_SELL}
                selected={operationType === IS_SELL}
                onPress={this.selectOperationType}
              />
              <Text style={styles.sellBuyOptionItemText}>Sell</Text>
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputItem}
            value={currencyAmount}
            placeholder="Amount"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            onChangeText={this.changeCurrencyAmount}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8
  },
  title: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "bold"
  },
  optionsPanel: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  dropDownPickerWrapper: {
    width: "44%",
    height: 40,
    borderWidth: 1,
    borderColor: "#69c15b",
    borderRadius: 6
  },
  dropDownPicker: {
    width: "100%",
    height: 40,
    color: "#69c15b"
  },
  sellBuyOption: {
    width: "44%",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#69c15b",
    borderRadius: 6
  },
  sellBuyOptionItem: {
    width: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  sellBuyOptionItemText: {
    fontSize: 16
  },
  inputContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  inputItem: {
    width: "44%",
    height: 40,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#69c15b",
    borderRadius: 6
  }
});
