import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const ClockContainer = () => {
  return (
    <View style={styles.clockHere}>
      <Text style={styles.clockHere1}>{`Clock here  ! `}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  clockHere1: {
    top: "0%",
    left: "0%",
    fontSize: FontSize.size_11xl,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorCadetblue,
    textAlign: "center",
    position: "absolute",
  },
  clockHere: {
    top: 0,
    left: 0,
    width: 189,
    height: 45,
    position: "absolute",
  },
});

export default ClockContainer;
