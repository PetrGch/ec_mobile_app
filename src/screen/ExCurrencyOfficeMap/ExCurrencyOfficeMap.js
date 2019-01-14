import React, { PureComponent } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {View, Dimensions, StyleSheet, Linking, TouchableNativeFeedback, Text} from "react-native";

export default class ExCurrencyOfficeMap extends PureComponent {
  constructor(props) {
    super(props);

    this.mapRef = null;

    this.state = {
      focusedLocation: {
        latitude: props.centerLat || 13.7563,
        longitude: props.centerLong || 100.5018,
        latitudeDelta: 0.0122,
        longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
      },
      myLocation: null
    };

    this.getMyLocation = this.getMyLocation.bind(this);
    this.openInGoogleMapApp = this.openInGoogleMapApp.bind(this);
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

  get marker() {
    const { markers } = this.props;
    const { focusedLocation, myLocation } = this.state;
    let markersList = [];

    if (myLocation) {
      markersList.push(myLocation);
    }

    if (Array.isArray(markers)) {
      markersList = markersList.concat(markers);
    }

    return markersList.map((marker) => {
      return (
        <MapView.Marker
          style={styles.mapMarker}
          key={`${marker.latitude}_${marker.longitude}`}
          coordinate={{...focusedLocation, ...marker}}
        />
      );
    })
  }

  render() {
    const { focusedLocation } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          ref={(ref) => this.mapRef = ref}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={focusedLocation}
          region={focusedLocation}
        >
          {this.marker}
        </MapView>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: 250
  },
  mapMarker: {
    width: 20,
    height: 20
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
