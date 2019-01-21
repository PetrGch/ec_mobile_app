import React, {PureComponent} from "react";
import SplashScreen from "react-native-splash-screen";
import {ActivityIndicator, StyleSheet, View, Dimensions} from "react-native";
import {LineChart} from "react-native-chart-kit";
import {processCentralBankData} from "./exCurrencyHomeDataProcessing";

export default class ExCurrencyHome extends PureComponent {
  constructor() {
    super();

    this.state = {
      screenWidth: null
    };

    this.orientationHandler = this.orientationHandler.bind(this);
  }

  componentDidMount() {
    const { loadAllOffices, loadCentralBankData } = this.props;

    this.setState({
      screenWidth: Dimensions.get('window').width
    });

    SplashScreen.hide();
    loadCentralBankData();
    Dimensions.addEventListener("change", this.orientationHandler);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.orientationHandler)
  }

  orientationHandler() {
    this.setState({
      screenWidth: Dimensions.get('window').width
    })
  }

  get chartData() {
    const { centralBankData } = this.props;
    const centralBankProcessedData = processCentralBankData(centralBankData);

    if (!centralBankProcessedData) {
      return null;
    }

    return centralBankProcessedData.chartData.reduce((dataItemAcc, dataItem) => {
      return {
        labels: [...dataItemAcc.labels, dataItem.period],
        datasets: [
          {
            ...dataItemAcc.datasets[0],
            data: [...dataItemAcc.datasets[0].data, dataItem["sell price"]]
          },
          {
            ...dataItemAcc.datasets[1],
            data: [...dataItemAcc.datasets[1].data, dataItem["buy price"]]
          }
        ]
      }
    },
      {
        labels: [],
        datasets: [
          {
            data: [],
            color: (opacity = 1) => `rgba(133, 191, 75, ${opacity})`
          }, {
            data: [],
            color: (opacity = 1) => `rgba(80, 191, 191, ${opacity})`
          }
        ]
      });
  }

  render() {
    const { isLoading } = this.props;
    const { screenWidth } = this.state;

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator/>
        </View>
      )
    }

    return this.chartData && (
      <View style={styles.container}>
        <LineChart
          data={this.chartData}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#eee',
            backgroundGradientTo: '#eee',
            color: (opacity = 1) => `rgba(66, 66, 66, ${opacity})`
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    width: "100%",
    backgroundColor: '#e26a00',
  }
});
