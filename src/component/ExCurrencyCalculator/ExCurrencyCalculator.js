import React, { PureComponent } from "react";
import { StyleSheet, Text, View, Picker, TextInput } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { Radio } from "../lib";
import {calculateCurrencyAmount, calculateCurrencySum} from "./exCurrencyCalculation";

const IS_BUY = "IS_BUY";
const IS_SELL = "IS_SELL";
const { Item } = Picker;

export function getPickerItems(currencyTypes) {
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

export default class ExCurrencyCalculator extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      operationType: IS_BUY,
      isCurrencySumHandlerTriggered: false,
      currencySum: calculateCurrencySum(props.currencyAmount, props.filteredOffices, props.operationType, props.officeName),
    };

    this.selectCurrencyType = this.selectCurrencyType.bind(this);
    this.selectOperationType = this.selectOperationType.bind(this);
    this.changeCurrencyAmount = this.changeCurrencyAmount.bind(this);
    this.changeCurrencySum = this.changeCurrencySum.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedCurrency, filteredOffices, currencyAmount, officeName } = this.props;
    const { operationType, isCurrencySumHandlerTriggered } = this.state;

    if (selectedCurrency !== prevProps.selectedCurrency
      || operationType !== prevState.operationType
      || (currencyAmount !== prevProps.currencyAmount && !isCurrencySumHandlerTriggered)) {
      this.setState({
        currencySum: calculateCurrencySum(currencyAmount, filteredOffices, operationType, officeName),
      })
    }
  }

  selectCurrencyType(itemValue) {
    const { selectCurrencyType } = this.props;

    selectCurrencyType(itemValue);
  }

  selectOperationType(type) {
    const { operationType } = this.state;

    if (type !== operationType) {
      this.setState({
        operationType: type
      });
    }
  }

  changeCurrencyAmount(value) {
    const { setCurrencyAmount } = this.props;
    const { isCurrencySumHandlerTriggered } = this.state;
    const currencyAmount = value !== "" ? parseInt(value) : "";

    setCurrencyAmount(currencyAmount);

    if (isCurrencySumHandlerTriggered) {
    this.setState(
      {
        isCurrencySumHandlerTriggered: false
      })
    }
  }

  changeCurrencySum(value) {
    const { filteredOffices, setCurrencyAmount, officeName } = this.props;
    const { operationType } = this.state;
    const currencyAmount = calculateCurrencyAmount(value, filteredOffices, operationType, officeName);

    this.setState(
      {
        currencySum: value,
        isCurrencySumHandlerTriggered: true
      },
      () => {
      setCurrencyAmount(currencyAmount);
    })
  }

  render() {
    const { currencyTypes, currencyAmount, selectedCurrency, officeName } = this.props;
    const { operationType, currencySum } = this.state;
    const pickerItem = getPickerItems(currencyTypes);

    if (!currencyTypes || !officeName) {
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
            value={currencyAmount.toString()}
            placeholder="Amount"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            onChangeText={this.changeCurrencyAmount}
          />
          <FontAwesome name="exchange" size={20}/>
          <TextInput
            style={styles.inputItem}
            value={currencySum.toString()}
            placeholder="Sum"
            placeholderTextColor="#ccc"
            keyboardType="decimal-pad"
            onChangeText={this.changeCurrencySum}
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
    fontSize: 16,
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
    fontSize: 14
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
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#69c15b",
    borderRadius: 6
  }
});
