import React, { PureComponent } from "react";
import {Text, View, StyleSheet, Linking, TouchableNativeFeedback} from "react-native";
import {validateValue} from "../../../reducer/reducerCalculation";

export default class ExCurrencyOfficeDetail extends PureComponent {
  constructor() {
    super();

    this.openInGoogleMapApp = this.openInGoogleMapApp.bind(this);
  }

  openInGoogleMapApp(url) {
    if (url) {
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

  render() {
    const { address, detail } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.detailTitle}>Details</Text>
        <View style={styles.detailItem}>
          <Text style={styles.detailItemKey}>Address: </Text>
          <Text style={styles.detailItemValue}>{validateValue(address)}</Text>
        </View>
        {
          detail && (
            <View>
              <TouchableNativeFeedback
                onPress={() => {this.openInGoogleMapApp(`tel:${detail.phone}`)}}
              >
                <View style={styles.detailItem}>
                  <Text style={styles.detailItemKey}>Phone: </Text>
                  <Text style={[styles.detailItemValue, styles.link]}>
                    {validateValue(detail.phone)}
                  </Text>
                </View>
              </TouchableNativeFeedback>

              <TouchableNativeFeedback
                onPress={() => {this.openInGoogleMapApp(detail.website)}}
              >
                <View style={styles.detailItem}>
                  <Text style={styles.detailItemKey}>Website: </Text>
                  <Text style={[styles.detailItemValue, styles.link]}>
                    {validateValue(detail.website)}
                  </Text>
                </View>
              </TouchableNativeFeedback>

              <TouchableNativeFeedback
                onPress={() => {this.openInGoogleMapApp(`mailto:${detail.email}`)}}
              >
                <View style={styles.detailItem}>
                  <Text style={styles.detailItemKey}>Email: </Text>
                  <Text style={[styles.detailItemValue, styles.link]}>
                    {validateValue(detail.email)}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    marginTop: 0,
  },
  detailTitle: {
    marginTop: 10,
    marginBottom: 2,
    fontSize: 16,
    fontWeight: "bold"
  },
  detailItem: {
    width: "100%",
    flexDirection: "row",
    marginTop: 4,
    marginBottom: 4
  },
  detailItemKey: {
    width: 90,
    fontWeight: "bold"
  },
  detailItemValue: {
    flex: 1
  },
  link: {
    color: "#07C"
  }
});
