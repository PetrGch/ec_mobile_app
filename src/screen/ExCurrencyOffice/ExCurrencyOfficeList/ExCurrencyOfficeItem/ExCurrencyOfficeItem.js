import React from "react";
import {Text, View, StyleSheet, TouchableNativeFeedback} from "react-native";
import { Navigation } from "react-native-navigation";

import {CURRENCY_OPERATION_TYPE} from "../../ExCurrencyOffice";
import {parseToFloat} from "../../../../component/util/validator";
import {findWorkingTimeOfCurrentDay} from "../ExCurrencyOfficeListUtil";

export default function ExCurrencyOfficeItem(props) {
  const  { id, company_name, branch_name, buy_price, sell_price,
    currencyAmount, operationType, currencyMark, workingTime, style } = props;
  const price = operationType === CURRENCY_OPERATION_TYPE.IS_BUY ? buy_price : sell_price;
  const sum = price * currencyAmount;
  const isWorkingNow = findWorkingTimeOfCurrentDay(workingTime);

  const selectOfficeHandler = () => {
    Navigation.push("exCurrencyOffice", {
      component: {
        name: "excurrate.exCurrencyOfficeInfo",
        passProps: {
          id,
          branch_name
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
        <View style={styles.containerGrid}>
          <View style={styles.infoColumn}>
            {
              isWorkingNow !== null && (<View style={styles.workingTimeInfo}>
                <View style={[styles.workingTimeInfoLabel, { backgroundColor: isWorkingNow ? "#69c15b" : "#f96645"} ]}/>
                <Text style={styles.workingTimeInfoText}>{isWorkingNow ? "Open" : "Close"}</Text>
              </View>)
            }
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
        <View style={styles.moreInfo}>
          <Text style={styles.moreInfoText}>More info</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 8,
    paddingTop: 10,
    paddingBottom: 10
  },
  containerGrid: {
    flexDirection: "row",
    alignItems: "center",
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
  },
  workingTimeInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  workingTimeInfoLabel: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginRight: 4
  },
  workingTimeInfoText: {
    marginRight: 10,
    fontSize: 12,
  },
  moreInfo: {
    alignItems: "center",
    width: "100%"
  },
  moreInfoText: {
    fontSize: 12,
    color: "#07C"
  }
});
