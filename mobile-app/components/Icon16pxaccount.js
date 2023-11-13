import React, { useMemo } from "react";
import { Image } from "expo-image";
import { StyleSheet, ImageSourcePropType } from "react-native";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Icon16pxaccount = ({
  icon16pxaccountIcon16pxac,
  icon16pxaccountPosition,
  icon16pxaccountWidth,
  icon16pxaccountHeight,
  icon16pxaccountTop,
  icon16pxaccountRight,
  icon16pxaccountBottom,
  icon16pxaccountLeft,
  icon16pxaccountMaxWidth,
  icon16pxaccountMaxHeight,
}) => {
  const icon16pxaccountStyle = useMemo(() => {
    return {
      ...getStyleValue("position", icon16pxaccountPosition),
      ...getStyleValue("width", icon16pxaccountWidth),
      ...getStyleValue("height", icon16pxaccountHeight),
      ...getStyleValue("top", icon16pxaccountTop),
      ...getStyleValue("right", icon16pxaccountRight),
      ...getStyleValue("bottom", icon16pxaccountBottom),
      ...getStyleValue("left", icon16pxaccountLeft),
      ...getStyleValue("maxWidth", icon16pxaccountMaxWidth),
      ...getStyleValue("maxHeight", icon16pxaccountMaxHeight),
    };
  }, [
    icon16pxaccountPosition,
    icon16pxaccountWidth,
    icon16pxaccountHeight,
    icon16pxaccountTop,
    icon16pxaccountRight,
    icon16pxaccountBottom,
    icon16pxaccountLeft,
    icon16pxaccountMaxWidth,
    icon16pxaccountMaxHeight,
  ]);

  return (
    <Image
      style={[styles.icon16pxaccount, icon16pxaccountStyle]}
      contentFit="cover"
      source={icon16pxaccountIcon16pxac}
    />
  );
};

const styles = StyleSheet.create({
  icon16pxaccount: {
    width: 16,
    height: 16,
    overflow: "hidden",
  },
});

export default Icon16pxaccount;
