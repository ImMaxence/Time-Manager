import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Property1small = ({
  buttonText,
  showButton,
  property1smallPosition,
  property1smallBackgroundColor,
  property1smallPaddingVertical,
  property1smallElevation,
  property1smallWidth,
  property1smallMarginTop,
  buttonFontSize,
  buttonColor,
}) => {
  const property1smallStyle = useMemo(() => {
    return {
      ...getStyleValue("position", property1smallPosition),
      ...getStyleValue("backgroundColor", property1smallBackgroundColor),
      ...getStyleValue("paddingVertical", property1smallPaddingVertical),
      ...getStyleValue("elevation", property1smallElevation),
      ...getStyleValue("width", property1smallWidth),
      ...getStyleValue("marginTop", property1smallMarginTop),
    };
  }, [
    property1smallPosition,
    property1smallBackgroundColor,
    property1smallPaddingVertical,
    property1smallElevation,
    property1smallWidth,
    property1smallMarginTop,
  ]);

  const buttonStyle = useMemo(() => {
    return {
      ...getStyleValue("fontSize", buttonFontSize),
      ...getStyleValue("color", buttonColor),
    };
  }, [buttonFontSize, buttonColor]);

  return (
    <View style={[styles.property1small, property1smallStyle]}>
      {showButton && (
        <Text style={[styles.button, buttonStyle]}>{buttonText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    fontSize: FontSize.size_sm,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorDarkslategray_100,
    textAlign: "center",
  },
  property1small: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorWhite,
    width: 160,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_3xs,
  },
});

export default Property1small;
