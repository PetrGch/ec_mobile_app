import React, { PureComponent } from "react";
import { StyleSheet, Text, View, Picker, TouchableWithoutFeedback } from "react-native";
import { Radio } from "native-base";

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

export default class ExCurrencyCalculator extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isBuy: true
    };

    this.selectCurrencyType = this.selectCurrencyType.bind(this);
  }

  selectCurrencyType(itemValue) {
    const { selectCurrencyType } = this.props;

    selectCurrencyType(itemValue);
  }

  render() {
    const { currencyTypes, selectedCurrency } = this.props;
    const pickerItem = getPickerItems(currencyTypes);

    if (!currencyTypes) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Currency Calculator</Text>
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
        <View>
          <View>
            <TouchableWithoutFeedback>
              <View>
                <Text>Buy</Text>
                <Radio
                  selected={false}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View>
            <Text>Sell</Text>
            <Radio
              selected={false}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    margin: 8
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold"
  },
  dropDownPickerWrapper: {
    width: "50%",
    height: 40,
    borderWidth: 1,
    borderColor: "#69c15b",
    borderRadius: 6
  },
  dropDownPicker: {
    width: "100%",
    height: 40,
    color: "#69c15b"
  }
});
