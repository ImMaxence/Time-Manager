import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const TypeAppointmentStatusCheck = ({
  title,
  showTitle,
  showStatus,
  typeAppointmentStatusChecPosition,
  typeAppointmentStatusChecBackgroundColor,
  typeAppointmentStatusChecBorderColor,
  typeAppointmentStatusChecOverflow,
  typeAppointmentStatusChecTop,
  typeAppointmentStatusChecLeft,
  typeAppointmentStatusChecElevation,
  typeAppointmentStatusChecWidth,
  typeAppointmentStatusChecHeight,
  typeAppointmentStatusChecBorderStyle,
  typeAppointmentStatusChecBorderLeftWidth,
}) => {
  const typeAppointmentStatusCheckStyle = useMemo(() => {
    return {
      ...getStyleValue("position", typeAppointmentStatusChecPosition),
      ...getStyleValue(
        "backgroundColor",
        typeAppointmentStatusChecBackgroundColor
      ),
      ...getStyleValue("borderColor", typeAppointmentStatusChecBorderColor),
      ...getStyleValue("overflow", typeAppointmentStatusChecOverflow),
      ...getStyleValue("top", typeAppointmentStatusChecTop),
      ...getStyleValue("left", typeAppointmentStatusChecLeft),
      ...getStyleValue("elevation", typeAppointmentStatusChecElevation),
      ...getStyleValue("width", typeAppointmentStatusChecWidth),
      ...getStyleValue("height", typeAppointmentStatusChecHeight),
      ...getStyleValue("borderStyle", typeAppointmentStatusChecBorderStyle),
      ...getStyleValue(
        "borderLeftWidth",
        typeAppointmentStatusChecBorderLeftWidth
      ),
    };
  }, [
    typeAppointmentStatusChecPosition,
    typeAppointmentStatusChecBackgroundColor,
    typeAppointmentStatusChecBorderColor,
    typeAppointmentStatusChecOverflow,
    typeAppointmentStatusChecTop,
    typeAppointmentStatusChecLeft,
    typeAppointmentStatusChecElevation,
    typeAppointmentStatusChecWidth,
    typeAppointmentStatusChecHeight,
    typeAppointmentStatusChecBorderStyle,
    typeAppointmentStatusChecBorderLeftWidth,
  ]);

  return (
    <View
      style={[
        styles.typeappointmentStatuscheck,
        typeAppointmentStatusCheckStyle,
      ]}
    >
      {showTitle && (
        <Text style={[styles.title, styles.titleTypo]}>{title}</Text>
      )}
      {showStatus && (
        <Text style={[styles.status, styles.titleTypo]}>Checked out</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titleTypo: {
    textAlign: "left",
    fontFamily: FontFamily.captionS,
  },
  title: {
    fontSize: FontSize.caption_size,
    lineHeight: 16,
    color: Color.gray900,
  },
  status: {
    fontSize: FontSize.captionS_size,
    lineHeight: 12,
    color: Color.gray700,
  },
  typeappointmentStatuscheck: {
    borderRadius: Border.br_9xs,
    backgroundColor: Color.gray300,
    borderStyle: "solid",
    borderColor: "#12bcb2",
    borderLeftWidth: 4,
    width: 120,
    overflow: "hidden",
    paddingLeft: Padding.p_5xs,
    paddingTop: Padding.p_11xs,
    paddingBottom: Padding.p_9xs,
  },
});

export default TypeAppointmentStatusCheck;
