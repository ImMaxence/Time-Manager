import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import TypeAppointmentStatusCheck from "./TypeAppointmentStatusCheck";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const TimeRangeFilterContainer = () => {
  return (
    <View style={styles.calendarappointmentParent}>
      <TypeAppointmentStatusCheck
        title="Robert Fox"
        showTitle={false}
        showStatus={false}
        typeAppointmentStatusChecPosition="absolute"
        typeAppointmentStatusChecBackgroundColor="#fff"
        typeAppointmentStatusChecBorderColor="unset"
        typeAppointmentStatusChecOverflow="unset"
        typeAppointmentStatusChecTop={15}
        typeAppointmentStatusChecLeft={-14}
        typeAppointmentStatusChecElevation={4}
        typeAppointmentStatusChecWidth={369}
        typeAppointmentStatusChecHeight={78}
        typeAppointmentStatusChecBorderStyle="unset"
      />
      <View style={[styles.ovalCopy2Parent, styles.textPosition]}>
        <Image
          style={styles.ovalCopy2}
          contentFit="cover"
          source={require("../assets/oval-copy-22.png")}
        />
        <Text style={[styles.text, styles.textPosition]}>21:00-12:00</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textPosition: {
    top: "50%",
    position: "absolute",
  },
  ovalCopy2: {
    width: 10,
    height: 10,
  },
  text: {
    marginTop: -7,
    left: 27,
    fontSize: FontSize.caption_size,
    letterSpacing: 1,
    lineHeight: 14,
    fontWeight: "200",
    fontFamily: FontFamily.assistantExtraLight,
    color: Color.colorLightslategray,
    textAlign: "center",
  },
  ovalCopy2Parent: {
    marginTop: -40,
    left: 107,
    width: 88,
    height: 14,
  },
  calendarappointmentParent: {
    top: 700,
    left: 48,
    width: 342,
    height: 110,
    position: "absolute",
  },
});

export default TimeRangeFilterContainer;
