import React, { PureComponent } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {View, StyleSheet} from "react-native";

export default class ExCurrencyOfficeMap extends PureComponent {
  get marker() {
    const { markers, focusedLocation, myLocation } = this.props;
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
    const { focusedLocation, setMapRef } = this.props;

    return (
      <View style={styles.container}>
        <MapView
          ref={setMapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={focusedLocation}
          region={focusedLocation}
        >
          {this.marker}
        </MapView>
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
  }
});
