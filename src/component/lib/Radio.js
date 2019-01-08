import React from "react";
import {View, StyleSheet, TouchableNativeFeedback} from "react-native";

export function Radio({ color, value, onPress, selected }) {
  const additionalStyles = color ? { borderColor: color } : null;

  const onPressHandler = () => {
    if (typeof onPress === "function") {
      onPress(value);
    }
  };

  return (
    <TouchableNativeFeedback
      onPress={onPressHandler}
      background={TouchableNativeFeedback.Ripple("#777", true)}
    >
      <View
        style={[styles.outerCircle, additionalStyles]}
      >
        {
          selected && (
            <View
              style={styles.innerCircle}
            />
          )
        }
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  outerCircle: {
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#69c15b"
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#69c15b",
    backgroundColor: "#69c15b"
  }
});
