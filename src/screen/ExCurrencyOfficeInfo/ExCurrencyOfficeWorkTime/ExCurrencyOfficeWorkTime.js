import React, { PureComponent } from "react";
import {Text, View, StyleSheet} from "react-native";
import moment from "moment";

function checkWorkingDays(from, to) {
  if (from && to) {
    return `${moment(from, "HH:mm").format("HH:mm")} - ${moment(to, "HH:mm").format("HH:mm")}`;
  }

  return "Not work";
}

function DayOfWeek({ workingTime, day, isActive }) {
  const highlightContainer = isActive ? { borderWidth: 1, borderColor: "#69c15b", borderRadius: 4 } : null;
  const highlightText = isActive ? { color: "#69c15b" } : null;

  return (
    <View style={[styles.workTimeItem, highlightContainer]}>
      <Text style={[styles.workTimeItemDay, highlightText]}>{day}: </Text>
      <Text style={[styles.workTimeItemTime, highlightText]}>{workingTime}</Text>
    </View>
  );
}

export default class ExCurrencyOfficeWorkTime extends PureComponent {
  render() {
    const { workingTime } = this.props;
    const dayOfWeek = moment().format("e");

    if (!workingTime) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.workTimeTitle}>Working time</Text>
        <DayOfWeek
          day="Mn"
          workingTime={checkWorkingDays(workingTime.mn_from, workingTime.mn_to)}
          isActive={dayOfWeek === '1'}
        />
        <DayOfWeek
          day="Tu"
          workingTime={checkWorkingDays(workingTime.tu_from, workingTime.tu_to)}
          isActive={dayOfWeek === '2'}
        />
        <DayOfWeek
          day="We"
          workingTime={checkWorkingDays(workingTime.we_from, workingTime.we_to)}
          isActive={dayOfWeek === '3'}
        />
        <DayOfWeek
          day="Th"
          workingTime={checkWorkingDays(workingTime.th_from, workingTime.th_to)}
          isActive={dayOfWeek === '4'}
        />
        <DayOfWeek
          day="Fr"
          workingTime={checkWorkingDays(workingTime.fr_from, workingTime.fr_to)}
          isActive={dayOfWeek === '5'}
        />
        <DayOfWeek
          day="St"
          workingTime={checkWorkingDays(workingTime.st_from, workingTime.st_to)}
          isActive={dayOfWeek === '6'}
        />
        <DayOfWeek
          day="Sn"
          workingTime={checkWorkingDays(workingTime.sn_from, workingTime.sn_to)}
          isActive={dayOfWeek === '0'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    marginTop: 0,
  },
  workTimeTitle: {
    marginTop: 10,
    marginBottom: 6,
    fontSize: 16,
    fontWeight: "bold"
  },
  workTimeItem: {
    width: "100%",
    padding: 2,
    paddingLeft: 4,
    paddingRight: 4,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  workTimeItemDay: {
    fontSize: 14,
    fontWeight: "bold"
  },
  workTimeItemTime: {

  }
});
