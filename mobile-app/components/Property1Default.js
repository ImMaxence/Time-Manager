import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Property1Default = ({
  placeholder,
  property1DefaultPosition,
  property1DefaultBackgroundColor,
  property1DefaultBorderStyle,
  property1DefaultBorderColor,
  property1DefaultBorderWidth,
  property1DefaultWidth,
  property1DefaultMarginTop,
  placeholderFontSize,
  placeholderFontFamily,
  placeholderColor,
}) => {
  const property1DefaultStyle = useMemo(() => {
    return {
      ...getStyleValue("position", property1DefaultPosition),
      ...getStyleValue("backgroundColor", property1DefaultBackgroundColor),
      ...getStyleValue("borderStyle", property1DefaultBorderStyle),
      ...getStyleValue("borderColor", property1DefaultBorderColor),
      ...getStyleValue("borderWidth", property1DefaultBorderWidth),
      ...getStyleValue("width", property1DefaultWidth),
      ...getStyleValue("marginTop", property1DefaultMarginTop),
    };
  }, [
    property1DefaultPosition,
    property1DefaultBackgroundColor,
    property1DefaultBorderStyle,
    property1DefaultBorderColor,
    property1DefaultBorderWidth,
    property1DefaultWidth,
    property1DefaultMarginTop,
  ]);

  const placeholderStyle = useMemo(() => {
    return {
      ...getStyleValue("fontSize", placeholderFontSize),
      ...getStyleValue("fontFamily", placeholderFontFamily),
      ...getStyleValue("color", placeholderColor),
    };
  }, [placeholderFontSize, placeholderFontFamily, placeholderColor]);

  return (
    <View style={[styles.property1default, property1DefaultStyle]}>
      <Text style={[styles.placeholder, placeholderStyle]}>{placeholder}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    fontSize: FontSize.size_base,
    fontWeight: "500",
    fontFamily: FontFamily.poppinsMedium,
    color: Color.colorDimgray,
    textAlign: "center",
  },
  property1default: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorGhostwhite_100,
    width: 357,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: Padding.p_xl,
    paddingTop: Padding.p_xl,
    paddingRight: Padding.p_16xl,
    paddingBottom: Padding.p_xl,
  },
});

export default Property1Default;
