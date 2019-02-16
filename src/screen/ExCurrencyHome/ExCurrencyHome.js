import React, {PureComponent} from "react";
import SplashScreen from "react-native-splash-screen";
import {ActivityIndicator, StyleSheet, View, Dimensions, ScrollView, Text} from "react-native";
import {LineChart} from "react-native-chart-kit";
import { AdMobBanner } from 'react-native-admob'

import {adaptCentralBankDataForChart, processCentralBankData} from "./exCurrencyHomeDataProcessing";
import ExCurrencyHomeControl from "./ExCurrencyHomeControl/ExCurrencyHomeControl";
import ExCurrencyHomeHeader from "./ExCurrencyHomeHeader/ExCurrencyHomeHeader";
import ExCurrencyHomeTrend from "./ExCurrencyHomeTrend/ExCurrencyHomeTrend";

export default class ExCurrencyHome extends PureComponent {
  constructor() {
    super();

    this.state = {
      screenWidth: null
    };

    this.orientationHandler = this.orientationHandler.bind(this);
  }

  componentDidMount() {
    const { loadCentralBankData } = this.props;

    this.setState({
      screenWidth: Dimensions.get('window').width - 16
    });

    loadCentralBankData();
    Dimensions.addEventListener("change", this.orientationHandler);
  }

  componentDidUpdate(prevProps) {
    const { isLoading } = this.props;

    if (!isLoading && isLoading !== prevProps.isLoading) {
      SplashScreen.hide();
    }
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.orientationHandler)
  }

  orientationHandler() {
    this.setState({
      screenWidth: Dimensions.get('window').width - 16
    })
  }

  get chartData() {
    const { centralBankData } = this.props;
    const centralBankProcessedData = processCentralBankData(centralBankData);

    if (!centralBankProcessedData) {
      return null;
    }

    return adaptCentralBankDataForChart(centralBankProcessedData.chartData);
  }

  render() {
    const { isLoading, loadCentralBankData, centralBankData } = this.props;
    const { screenWidth } = this.state;
    const chartData = this.chartData;

    return chartData && centralBankData && (
      <ScrollView>
        <View style={styles.container}>
          <ExCurrencyHomeHeader
            centralBankData={centralBankData}
          />
          <ExCurrencyHomeControl
            loadCentralBankData={loadCentralBankData}
          />
          <View style={styles.chartWrapper}>
            {
              isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator/>
                </View>
                ) : (
                <LineChart
                  withDots={false}
                  data={chartData}
                  width={screenWidth}
                  height={220}
                  chartConfig={{
                    backgroundGradientFrom: '#eee',
                    backgroundGradientTo: '#eee',
                    color: (opacity = 1) => `rgba(66, 66, 66, ${opacity})`
                  }}
                />
              )
            }
            <View style={styles.legend}>
              <View style={[styles.legendItem, { marginRight: 20 }]}>
                <View style={[styles.legendSquare, { backgroundColor: "#85bf4b" }]}/>
                <Text>Buy price</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendSquare, { backgroundColor: "#50bfbf" }]}/>
                <Text>Sell price</Text>
              </View>
            </View>
          </View>
          {
            !isLoading && (
              <ExCurrencyHomeTrend
                data={centralBankData}
              />
            )
          }
          <AdMobBanner
            adSize="fullBanner"
            adUnitID="ca-app-pub-2778407729992409/7514773534"
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => console.error(error)}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    backgroundColor: "#eee"
  },
  container: {
    width: "100%",
    marginBottom: 10
  },
  chartWrapper: {
    margin: 8,
    marginBottom: 0
  },
  legend: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8
  },
  legendItem: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  legendSquare: {
    width: 16,
    height: 16,
    marginRight: 6
  }
});
