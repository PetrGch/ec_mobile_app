import React, { Component } from "react";
import {StyleSheet, Text, View, Picker, TextInput, Slider} from "react-native";

import {Radio} from "../../../component/lib";
import {CURRENCY_OPERATION_TYPE} from "../ExCurrencyOffice";

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

export default class ExCurrencyOfficeCalculator extends Component {
  constructor(props) {
    super(props);

    this.selectCurrencyType = this.selectCurrencyType.bind(this);
    this.changeCurrencyAmount = this.changeCurrencyAmount.bind(this);
    this.setSliderValue = this.setSliderValue.bind(this);
  }

  selectCurrencyType(itemValue) {
    const { selectCurrencyType } = this.props;

    selectCurrencyType(itemValue);
  }

  changeCurrencyAmount(value) {
    const { setCurrencyAmount } = this.props;
    const currencyAmount = value !== "" ? parseInt(value) : "";

    setCurrencyAmount(currencyAmount);
  }

  setSliderValue(value) {
    const { setCurrencyAmount } = this.props;

    setCurrencyAmount(value);
  }

  render() {
    const {
      currencyTypes,
      currencyAmount,
      operationType,

      selectedCurrency,
      selectOperationType
    } = this.props;
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
                value={CURRENCY_OPERATION_TYPE.IS_BUY}
                selected={operationType === CURRENCY_OPERATION_TYPE.IS_BUY}
                onPress={selectOperationType}
              />
              <Text style={styles.sellBuyOptionItemText}>Buy</Text>
            </View>
            <View style={[styles.sellBuyOptionItem, { marginRight: 8}]}>
              <Radio
                value={CURRENCY_OPERATION_TYPE.IS_SELL}
                selected={operationType === CURRENCY_OPERATION_TYPE.IS_SELL}
                onPress={selectOperationType}
              />
              <Text style={styles.sellBuyOptionItemText}>Sell</Text>
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputItem}
            value={currencyAmount.toString()}
            maxLength={5}
            placeholder="Amount"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            onChangeText={this.changeCurrencyAmount}
          />
          <Slider
            style={styles.inputSlider}
            value={+currencyAmount}
            step={10}
            maximumValue={1000}
            minimumTrackTintColor="#69c15b"
            thumbTintColor="#69c15b"
            onSlidingComplete={this.setSliderValue}
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
  },
  inputItem: {
    width: "100%",
    height: 40,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#69c15b",
    borderRadius: 6
  },
  inputSlider: {
    marginTop: 10
  }
});
