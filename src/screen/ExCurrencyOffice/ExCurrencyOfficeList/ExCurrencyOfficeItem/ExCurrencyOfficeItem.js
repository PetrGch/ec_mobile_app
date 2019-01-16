import React from "react";
import {Text, View, StyleSheet, TouchableNativeFeedback} from "react-native";
import { Navigation } from "react-native-navigation";

import {CURRENCY_OPERATION_TYPE} from "../../ExCurrencyOffice";
import {parseToFloat} from "../../../../component/util/validator";

export default function ExCurrencyOfficeItem(props) {
  const  { company_name, branch_name, buy_price, sell_price, workingTime, address, updated_at,
    currencyAmount, operationType, currencyMark, lat, lng, google_map_url, style } = props;
  const price = operationType === CURRENCY_OPERATION_TYPE.IS_BUY ? buy_price : sell_price;
  const sum = price * currencyAmount;

  const selectOfficeHandler = () => {
    Navigation.push("exCurrencyOffice", {
      component: {
        name: "excurrate.exCurrencyOfficeInfo",
        passProps: {
          branch_name,
          company_name,
          lat,
          lng,
          google_map_url,
          workingTime,
          address,
          updated_at,
          buy_price,
          sell_price,
          currencyMark
        },
        options: {
          topBar: {
            title: {
              text: branch_name,
              color: "#fff"
            },
            background: {
              color: "#69c15b"
            },
            backButton: { color: '#ffffff' }
          }
        }
      }
    })
  };

  return (
    <TouchableNativeFeedback
      onPress={selectOfficeHandler}
    >
      <View style={[styles.container, style]}>
        <View style={styles.infoColumn}>
          <Text style={styles.infoColumnTitle}>{company_name}</Text>
          <Text style={styles.infoColumnDubTitle}>{branch_name}</Text>
        </View>
        <View style={styles.buyColumn}>
          <Text>{parseToFloat(price)} {currencyMark}</Text>
        </View>
        <View style={styles.sellColumn}>
          <Text>{parseToFloat(sum)} {currencyMark}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    paddingTop: 10,
    paddingBottom: 10
  },
  infoColumn: {
    width: "55%"
  },
  infoColumnTitle: {
    fontSize: 14
  },
  infoColumnDubTitle: {
    fontSize: 12
  },
  buyColumn: {
    width: "20%"
  },
  sellColumn: {
    width: "25%"
  }
});
