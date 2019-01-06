import React, { PureComponent } from "react";
import {ActivityIndicator, Text, View, StyleSheet} from "react-native";
import SplashScreen from 'react-native-splash-screen'

export default class ExCurrencyOffice extends PureComponent {
  render() {
    const { offices, isLoading } = this.props;

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text>All Offices</Text>
      </View>
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
  }
});