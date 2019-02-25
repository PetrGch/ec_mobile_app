import React, { PureComponent } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from "react-native";
import { Navigation } from "react-native-navigation";
import moment from "moment";
import {AdMobBanner} from "react-native-admob";

import ExCurrencyCalculator from "../../component/ExCurrencyCalculator/ExCurrencyCalculator";
import ExCurrencyOfficeMap from "../ExCurrencyOfficeMap/ExCurrencyOfficeMap";
import ExCurrencyOfficeWorkTime from "./ExCurrencyOfficeWorkTime/ExCurrencyOfficeWorkTime";
import ExCurrencyOfficeDetail from "./ExCurrencyOfficeDetail/ExCurrencyOfficeDetail";
import {findOfficeById} from "../../reducer/reducerCalculation";
import {getOfficeByName} from "../../component/ExCurrencyCalculator/exCurrencyCalculation";
import ExCurrencyOfficeRange from "./ExCurrencyOfficeRange/ExCurrencyOfficeRange";

export default class ExCurrencyOfficeInfo extends PureComponent {
  constructor(props) {
    super(props);

    this.mapRef = null;

    this.state = {
      selectedFilteredOffice: null,
      selectedOffice: null,
      focusedLocation: null,
      myLocation: null
    };

    Navigation.events().bindComponent(this);

    this.getMyLocation = this.getMyLocation.bind(this);
    this.openInGoogleMapApp = this.openInGoogleMapApp.bind(this);
    this.setMapRef = this.setMapRef.bind(this);
  }

  componentDidMount() {
    const { offices, filteredOffices, branchName, id } = this.props;
    const selectedOffice = findOfficeById(id, offices);
    const selectedFilteredOffice = getOfficeByName(filteredOffices, branchName);

    if (selectedOffice) {
      this.setState({
        selectedOffice,
        selectedFilteredOffice,
        focusedLocation: {
          latitude: parseFloat(selectedOffice.lat) || 13.7563,
          longitude: parseFloat(selectedOffice.lng) || 100.5018,
          latitudeDelta: 0.0122,
          longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
        }
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedCurrency, filteredOffices, currencyAmount, branchName } = this.props;

    if (selectedCurrency !== prevProps.selectedCurrency
      || (currencyAmount !== prevProps.currencyAmount)) {
      this.setState({
        selectedFilteredOffice: getOfficeByName(filteredOffices, branchName)
      })
    }
  }

  componentDidDisappear() {
    const { componentId } = this.props;

    Navigation
      .pop(componentId)
      .catch((ex) => {
        console.log(ex)
      });
  }

  getMyLocation() {
    const { myLocation, focusedLocation } = this.state;

    if (!myLocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.setState({
          myLocation: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        });

        this.mapRef.animateToRegion({
          ...focusedLocation,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      }, (ex) => {
        console.log(ex);
      });
    }
  };

  openInGoogleMapApp() {
    const { selectedOffice } = this.state;
    if (selectedOffice && selectedOffice.google_map_url) {
      const url = selectedOffice.google_map_url;
      Linking.canOpenURL(url)
        .then(supported => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log("Don't know how to open URI: " + url);
          }
      });
    }
  };

  setMapRef(ref) {
    this.mapRef = ref;
  }

  render() {
    const {
      currencyTypes,
      filteredOffices,
      currencyAmount,
      selectedCurrency,

      selectCurrencyType,
      setCurrencyAmount
    } = this.props;
    const { focusedLocation, myLocation, selectedOffice, selectedFilteredOffice } = this.state;

    if (!selectedOffice || !selectedFilteredOffice) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <AdMobBanner
            adSize="smartBannerPortrait"
            adUnitID="ca-app-pub-3940256099942544/6300978111"
          />

          <View style={styles.header}>
            <Text style={styles.officeName}>Office name: {selectedOffice.company_name}</Text>
            <Text style={styles.branchName}>Branch name: {selectedOffice.branch_name}</Text>
          </View>

          <View style={styles.priceContainer}>
            <View style={styles.priceUpdate}>
              <Text style={{ marginBottom: 6, fontWeight: "bold" }}>
                Last update:
              </Text>
              <Text>{moment(selectedOffice.updated_at).format("HH:mm")}</Text>
            </View>
            <View style={styles.priceValueContainer}>
              <View style={styles.priceValue}>
                <Text style={{ fontWeight: "bold" }}>Buy: </Text>
                <Text>{selectedFilteredOffice.buy_price}{selectedFilteredOffice.currencyMark}</Text>
              </View>
              <View style={styles.priceValue}>
                <Text style={{ fontWeight: "bold" }}>Sell: </Text>
                <Text>{selectedFilteredOffice.sell_price}{selectedFilteredOffice.currencyMark}</Text>
              </View>
            </View>
          </View>

          <ExCurrencyOfficeRange
            selectedCurrency={selectedCurrency}
            selectedOffice={selectedOffice}
            currencyMark={selectedFilteredOffice.currencyMark}
          />

          <ExCurrencyCalculator
            officeName={selectedOffice.branch_name}
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
            setMapRef={this.setMapRef}
            focusedLocation={focusedLocation}
            myLocation={myLocation}
            markers={[{ latitude: parseFloat(selectedOffice.lat), longitude: parseFloat(selectedOffice.lng) }]}

          />
          <View style={styles.navigation}>
            <TouchableNativeFeedback
              onPress={this.getMyLocation}
            >
              <View style={styles.navigationButton}>
                <Text style={styles.navigationButtonText}>FIND ME</Text>
              </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback
              onPress={this.openInGoogleMapApp}
            >
              <View style={styles.navigationButton}>
                <Text style={styles.navigationButtonText}>OPEN IN GOOGLE MAP</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <ExCurrencyOfficeWorkTime
          workingTime={selectedOffice.exchange_company_working_time}
        />
        <ExCurrencyOfficeDetail
          address={selectedOffice.address}
          detail={selectedOffice.exchange_company_detail}
        />
        <AdMobBanner
          adSize="smartBannerPortrait"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
        />
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
  priceContainer: {
    margin: 8,
  },
  priceUpdate: {
    flexDirection: "row",
  },
  priceValueContainer: {
    width: "100%",
    flexDirection: "row",
  },
  priceValue: {
    width: "40%",
    flexDirection: "row",
  },
  map: {
    margin: 8,
  },
  navigation: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10
  },
  navigationButton: {
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#69c15b",
    backgroundColor: "#69c15b"
  },
  navigationButtonText: {
    color: "#ffffff"
  }
});
