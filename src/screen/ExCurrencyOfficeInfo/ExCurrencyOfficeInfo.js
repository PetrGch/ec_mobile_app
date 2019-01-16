import React, { PureComponent } from "react";
import {Dimensions, Linking, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View} from "react-native";
import { Navigation } from "react-native-navigation";
import moment from "moment";

import ExCurrencyCalculator from "../../component/ExCurrencyCalculator/ExCurrencyCalculator";
import ExCurrencyOfficeMap from "../ExCurrencyOfficeMap/ExCurrencyOfficeMap";
import ExCurrencyOfficeWorkTime from "./ExCurrencyOfficeWorkTime/ExCurrencyOfficeWorkTime";
import ExCurrencyOfficeDetail from "./ExCurrencyOfficeDetail/ExCurrencyOfficeDetail";

export default class ExCurrencyOfficeInfo extends PureComponent {
  constructor(props) {
    super(props);

    this.mapRef = null;

    this.state = {
      focusedLocation: {
        latitude: parseFloat(props.lat) || 13.7563,
        longitude: parseFloat(props.lng) || 100.5018,
        latitudeDelta: 0.0122,
        longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
      },
      myLocation: null
    };

    Navigation.events().bindComponent(this);

    this.getMyLocation = this.getMyLocation.bind(this);
    this.openInGoogleMapApp = this.openInGoogleMapApp.bind(this);
    this.setMapRef = this.setMapRef.bind(this);
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
    const { googleMapUrl } = this.props;

    Linking.canOpenURL(googleMapUrl).then(supported => {
      if (supported) {
        Linking.openURL(googleMapUrl);
      } else {
        console.log("Don't know how to open URI: " + googleMapUrl);
      }
    });
  };

  setMapRef(ref) {
    this.mapRef = ref;
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
      workingTime,
      address,
      updatedAt,
      buyPrice,
      sellPrice,
      currencyMark,

      selectCurrencyType,
      setCurrencyAmount
    } = this.props;
    const { focusedLocation, myLocation } = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.officeName}>Office name: {companyName}</Text>
            <Text style={styles.branchName}>Branch name: {branchName}</Text>
          </View>

          <View style={styles.priceContainer}>
            <View style={styles.priceUpdate}>
              <Text style={{ marginBottom: 6, fontWeight: "bold" }}>
                Last update:
              </Text>
              <Text>{moment(updatedAt).format("HH:mm")}</Text>
            </View>
            <View style={styles.priceValueContainer}>
              <View style={styles.priceValue}>
                <Text style={{ fontWeight: "bold" }}>Buy: </Text>
                <Text>{buyPrice}{currencyMark}</Text>
              </View>
              <View style={styles.priceValue}>
                <Text style={{ fontWeight: "bold" }}>Sell: </Text>
                <Text>{sellPrice}{currencyMark}</Text>
              </View>
            </View>
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
            setMapRef={this.setMapRef}
            focusedLocation={focusedLocation}
            myLocation={myLocation}
            markers={[{ latitude: parseFloat(lat), longitude: parseFloat(lng) }]}

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
          workingTime={workingTime}
        />
        <ExCurrencyOfficeDetail
          address={address}
        />
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
