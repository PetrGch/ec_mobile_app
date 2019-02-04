import React, {PureComponent} from "react";
import {Picker, View, StyleSheet} from "react-native";
import {getPickerItems} from "../../../component/ExCurrencyCalculator/ExCurrencyCalculator";

const currencyTypes = [
  {
    index: "EUR",
    value: "EUR"
  },
  {
    index: "USD",
    value: "USD"
  }
];

const rangeTypes = [
  {
    index: "Week (7 days)",
    value: "7"
  },
  {
    index: "Month (30 days)",
    value: "30"
  }
];

export default class ExCurrencyHomeControl extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedCurrency: "EUR",
      selectedRange: "7"
    };

    this.selectCurrencyType = this.selectCurrencyType.bind(this);
    this.selectRangeType = this.selectRangeType.bind(this);
  }

  selectCurrencyType(selectedCurrency) {
    const {loadCentralBankData} = this.props;
    const {selectedRange} = this.state;

    loadCentralBankData(selectedRange, selectedCurrency);
    this.setState({
      selectedCurrency: selectedCurrency
    });
  }

  selectRangeType(selectedRange) {
    const {loadCentralBankData} = this.props;
    const {selectedCurrency} = this.state;

    loadCentralBankData(selectedRange, selectedCurrency);
    this.setState({
      selectedRange
    });
  }

  render() {
    const {selectedCurrency, selectedRange} = this.state;
    const currencyPickerItem = getPickerItems(currencyTypes);
    const rangePickerItem = getPickerItems(rangeTypes);

    return (
      <View style={styles.container}>
        <View style={[styles.dropDownPickerWrapper, styles.dropDownCurrencyPicker]}>
          <Picker
            style={styles.dropDownPicker}
            selectedValue={selectedCurrency}
            mode="dropdown"
            onValueChange={this.selectCurrencyType}>
            {currencyPickerItem}
          </Picker>
        </View>
        <View style={[styles.dropDownPickerWrapper, styles.dropDownRangePicker]}>
          <Picker
            selectedValue={selectedRange}
            style={styles.dropDownPicker}
            mode="dropdown"
            onValueChange={this.selectRangeType}>
            {rangePickerItem}
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 8,
    marginBottom: 0
  },
  dropDownPickerWrapper: {
    width: "44%",
    height: 40,
    borderWidth: 1,
    borderColor: "#69c15b",
    borderRadius: 6
  },
  dropDownCurrencyPicker: {
    width: "35%"
  },
  dropDownRangePicker: {
    width: "60%"
  },
  dropDownPicker: {
    width: "100%",
    height: 40,
    color: "#69c15b"
  },
});
