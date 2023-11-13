import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, Padding } from "../GlobalStyles";

const NavigationBarContainer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <Image
        style={styles.icon}
        contentFit="cover"
        source={require("../assets/icon.png")}
      />
      <Pressable
        style={[styles.icon1, styles.icon1SpaceBlock]}
        onPress={() => navigation.navigate("Working")}
      >
        <Image
          style={styles.iconLayout}
          contentFit="cover"
          source={require("../assets/icon1.png")}
        />
      </Pressable>
      <Image
        style={[styles.icon1, styles.icon1SpaceBlock]}
        contentFit="cover"
        source={require("../assets/icon2.png")}
      />
      <Pressable
        style={[styles.user1, styles.icon1SpaceBlock]}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image
          style={[styles.icon4, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/user-1.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  icon1SpaceBlock: {
    marginLeft: 84,
    height: 20,
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  icon: {
    height: 20,
    width: 20,
  },
  icon1: {
    width: 18,
  },
  icon4: {
    overflow: "hidden",
  },
  user1: {
    width: 20,
    marginLeft: 84,
  },
  navbar: {
    position: "absolute",
    backgroundColor: "red",
    top: 840,
    left: 25,
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorWhite,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    width: 381,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: Padding.p_11xl,
    paddingTop: Padding.p_9xs,
    paddingBottom: Padding.p_9xs,
  },
});

export default NavigationBarContainer;
