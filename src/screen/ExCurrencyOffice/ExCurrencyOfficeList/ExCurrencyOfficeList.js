import React, { PureComponent } from "react";
import {Picker, StyleSheet, Text, TextInput, TouchableNativeFeedback, View} from "react-native";

import ExCurrencyOfficeItem from "./ExCurrencyOfficeItem/ExCurrencyOfficeItem";
import {CURRENCY_OPERATION_TYPE} from "../ExCurrencyOffice";
import {getPickerItems} from "../../../component/ExCurrencyCalculator/ExCurrencyCalculator";
import {getMyLocation} from "../../../component/util/geolocation";
import {
  filterOfficesByName,
  sortByGeolocation,
  sortedOfficesBtLowPrice,
  sortedOfficesByHighPrice,
  sortedOfficesByName
} from "./ExCurrencyOfficeListUtil";

const HIGH_PRICE = "HIGH_PRICE";
const LOW_PRICE = "LOW_PRICE";
const CLOSEST = "CLOSEST";
const NAME = "NAME";

const sortItem = [
  {
    index: "Low Price",
    value: LOW_PRICE
  },
  {
    index: "High price",
    value: HIGH_PRICE
  },
  {
    index: "Close to me",
    value: CLOSEST
  },
  {
    index: "Office name",
    value: NAME
  },
];

export default class ExCurrencyOfficeList extends PureComponent {
  constructor() {
    super();

    this.state = {
      sortedType: LOW_PRICE,
      filterValue: "",
      myLocation: null
    };

    this.selectSortType = this.selectSortType.bind(this);
    this.setOfficeNameForFiltering = this.setOfficeNameForFiltering.bind(this);
  }

  selectSortType(sortedType) {
    this.setState({
      sortedType
    });
  }

  setOfficeNameForFiltering(filterValue) {
    this.setState({
      filterValue
    });
  }

  setMyLocation() {
    const { myLocation } = this.state;

    if (!myLocation) {
      getMyLocation()
        .then((pos) => {
          this.setState({
            myLocation: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            }
          });
        }, (ex) => {
          console.log(ex);
        });
    }
  };

  filterOfficeByName() {
    const { filterValue } = this.state;
    const { filteredOffices } = this.props;

    if (!!filterValue) {
      return filterOfficesByName(filteredOffices, filterValue);
    }

    return filteredOffices;
  }

  sortOffices() {
    const { sortedType, myLocation } = this.state;
    const { operationType } = this.props;
    const filteredByNameOffices = this.filterOfficeByName();

    if (sortedType === HIGH_PRICE) {
      return sortedOfficesByHighPrice(filteredByNameOffices, operationType);
    }

    if (sortedType === LOW_PRICE) {
      return sortedOfficesBtLowPrice(filteredByNameOffices, operationType);
    }

    if (sortedType === NAME) {
      return sortedOfficesByName(filteredByNameOffices);
    }

    if (sortedType === CLOSEST) {
      this.setMyLocation();
      if (myLocation && myLocation.latitude && myLocation.longitude) {
        return sortByGeolocation(filteredByNameOffices, myLocation.latitude, myLocation.longitude);
      }
    }


    return filteredByNameOffices;
  }

  getListOfOffices() {
    const { filteredOffices, operationType, currencyAmount } = this.props;

    if (!filteredOffices) {
      return null;
    }
    return this.sortOffices().map((office, index) => {
      const backgroundColor = index % 2 !== 0 ? "#eee" : "#fff" ;

      return (
        <ExCurrencyOfficeItem
          key={office.id}
          operationType={operationType}
          currencyAmount={currencyAmount}
          style={{ backgroundColor }}
          {...office}
        />
      )
    });
  }

  render() {
    const { operationType } = this.props;
    const { sortedType, filterValue } = this.state;
    const listOfOffice = this.getListOfOffices();
    const sortPickerItem = getPickerItems(sortItem);
    const priceTitle = operationType === CURRENCY_OPERATION_TYPE.IS_BUY ? "Buy" : "Sell";

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Exchange offices
        </Text>
        <View style={styles.officeGridNavigation}>
          <View style={styles.officeGridSort}>
            <View style={styles.officeGridSortDropDown}>
              <Picker
                style={styles.dropDownPicker}
                selectedValue={sortedType}
                mode="dropdown"
                onValueChange={this.selectSortType}>
                {sortPickerItem}
              </Picker>
            </View>
          </View>
          <View style={styles.officeGridFilter}>
            <TextInput
              style={styles.officeGridFilterInput}
              value={filterValue}
              placeholder="Filter by name"
              placeholderTextColor="#ccc"
              onChangeText={this.setOfficeNameForFiltering}
            />
          </View>
        </View>
        <View style={styles.currencyHeaderContainer}>
          <View style={styles.currencyHeaderTitle}>
            <Text style={styles.currencyHeaderTitleText}>
              Office name
            </Text>
          </View>
          <View style={styles.currencyHeaderPrice}>
            <Text style={styles.currencyHeaderPriceText}>
              {priceTitle}
            </Text>
          </View>
          <View style={styles.currencyHeaderAmount}>
            <Text style={styles.currencyHeaderPriceText}>
              Amount
            </Text>
          </View>
        </View>
        <View style={styles.currencyOfficeList}>
          {listOfOffice}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    margin: 8,
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold"
  },
  officeGridNavigation: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    margin: 8,
    marginTop: 0,
  },
  officeGridSort: {
    width: "45%"
  },
  officeGridSortDropDown: {
    justifyContent: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#69c15b",
    borderRadius: 6
  },
  officeGridFilter: {
    width: "45%"
  },
  officeGridFilterInput: {
    width: "100%",
    height: 40,
    paddingVertical: 0,
    paddingHorizontal: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#69c15b",
    borderRadius: 6
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
    width: "55%",
  },
  currencyHeaderTitleText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "bold"
  },
  currencyHeaderPrice: {
    width: "20%"
  },
  currencyHeaderAmount: {
    width: "25%"
  },
  currencyOfficeList: {
    marginBottom: 10
  }
});
