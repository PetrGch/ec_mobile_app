import React, { PureComponent } from "react";
import {Text, View, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment/moment";

function TrendRow({ prevPrice, price }) {
  if (isNaN(prevPrice) || isNaN(price)) {
    return null;
  }

  if (parseFloat(prevPrice) < parseFloat(price)) {
    return <Text><Icon name="arrow-up" color="#69c15b"/></Text>
  } else if (parseFloat(prevPrice) > parseFloat(price)) {
    return <Text><Icon name="arrow-down" color="#ff392d"/></Text>
  }

  return <Text>-</Text>;
}

function renderTrendItems(dataDetail) {
  if (!dataDetail || !dataDetail.central_bank_details) {
    return null;
  }

  let prevSellPrice = null;
  let prevBuyPrice = null;

  return dataDetail.central_bank_details.map((trend, index) => {
    const backgroundColor = index % 2 !== 0 ? "#eee" : "#fff" ;

    const trendItem = (
      <View key={trend.period} style={[styles.trendItem, {backgroundColor}]}>
        <View style={styles.trendItemPeriod}>
          <Text>{moment(trend.period).format("DD/MM/YYYY")}</Text>
        </View>
        <View style={styles.trendItemPrice}>
          <Text style={{marginRight: 4}}>
            {parseFloat(trend.buy_price).toFixed(3)}
          </Text>
          <TrendRow prevPrice={prevBuyPrice} price={trend.buy_price}/>
        </View>
        <View style={styles.trendItemPrice}>
          <Text style={{marginRight: 4}}>
            {parseFloat(trend.sell_price).toFixed(3)}
          </Text>
          <TrendRow prevPrice={prevSellPrice} price={trend.sell_price}/>
        </View>
      </View>
    );


    prevBuyPrice = trend.buy_price;
    prevSellPrice = trend.sell_price;

    return trendItem;
  })
}

export default class ExCurrencyHomeTrend extends PureComponent {
  render() {
    const { data } = this.props;
    const trends = renderTrendItems(data);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Dynamics of the cost</Text>

        <View style={[styles.trendItem, { backgroundColor: "#eee" }]}>
          <View style={styles.trendItemPeriod}>
            <Text style={{fontWeight: "bold"}}>Period</Text>
          </View>
          <View style={styles.trendItemPrice}>
            <Text style={{fontWeight: "bold"}}>Buy</Text>
          </View>
          <View style={styles.trendItemPrice}>
            <Text style={{fontWeight: "bold"}}>Sell</Text>
          </View>
        </View>
        {trends}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8
  },
  trendItem: {
    flexDirection: "row"
  },
  trendItemPeriod: {
    width: "50%"
  },
  trendItemPrice: {
    flexDirection: "row",
    alignItems: "center",
    width: "25%"
  }
});
