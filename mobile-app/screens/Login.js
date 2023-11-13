import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {

  const navigation = useNavigation();

  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitLogin = async () => {

    if (username.length <= 0 || password.length <= 0) {
      setError("Both fields must be completed")
    }

    else {

      await axios.post("http://localhost:4000/api/login", { "username": username, "password": password })
        .then((res) => {
          var data = res.data

          const storeData = async () => {
            try {
              await AsyncStorage.setItem('jwt', data.jwt)
              await AsyncStorage.setItem('id', data.user.id.toString())
              await AsyncStorage.setItem('username', data.user.username)
              await AsyncStorage.setItem('email', data.user.email)

            } catch (e) {
              console.log("error in storeData : " + e)
            }
          }

          storeData();

          navigation.navigate("Home")

        })
        .catch((err) => {
          console.log(err);
          setError("The password or username is incorrect")
        })
    }


  }

  return (
    <View style={styles.login}>
      <Image
        style={[styles.objectsIcon, styles.backgroundPosition]}
        contentFit="cover"
        source={require("../assets/objects2.png")}
      />
      <View style={[styles.header, styles.headerPosition]}>
        <Text style={[styles.loginHere, styles.signUp1Typo]}>Login here</Text>
        <Text
          style={[styles.welcomeBackYouve, styles.welcomeBackYouveTypo, styles.marginT]}
        >{`Welcome back`}
        </Text>
        <Text style={[styles.welcomeBackYouve, styles.welcomeBackYouveTypo]}>you’ve been missed !</Text>
      </View>
      <View style={[styles.force_w]}>

        <View style={styles.view}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={text => setUsername(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />

        </View>

        <View style={styles.view}>

          <Pressable style={styles.signin} onPress={handleSubmitLogin}>
            <Text style={styles.signin_text}>Sign In</Text>
          </Pressable>

          <Text style={styles.error}>{error}</Text>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  error: {
    marginTop: 30,
    color: "red"
  },
  force_w: {
    width: '90%',

    marginLeft: '5%',

    marginTop: 120,
  },
  signin_text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  signin: {
    backgroundColor: "#479696",
    padding: 12,
    borderRadius: 10,
    marginTop: 50,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  view: {

    width: '100%',
  },
  input: {
    backgroundColor: "#F5F9F9",
    width: "100%",
    marginTop: 15,
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    color: "#626262",
    fontSize: 16,

  },
  backgroundPosition: {
    left: -400,
    top: -420,
    position: "absolute",
  },
  headerPosition: {

    position: "relative",
  },
  signUp1Typo: {
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
  },
  welcomeBackYouveTypo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
  },
  formPosition: {
    left: 31,
    position: "absolute",
  },
  background: {
    width: 428,
    top: 0,
    height: 926,
  },
  objectsIcon: {
    width: 1113,
    height: 1431,
    top: 0,
  },
  loginHere: {
    fontSize: FontSize.size_11xl,
    textAlign: "center",
    color: Color.colorCadetblue,

  },
  welcomeBackYouve: {

    fontSize: FontSize.size_xl,
    color: Color.colorBlack,


  },
  marginT: {
    marginTop: 20
  },
  header: {

    width: "100%",
    height: 131,

    marginTop: 80
  },
  forgotYourPassword: {
    fontSize: FontSize.size_sm,
    marginTop: 30,
    color: Color.colorCadetblue,
  },
  actions: {
    marginTop: 30,
  },
  form: {
    top: 302,
    alignItems: "flex-end",
  },
  dontHaveAn: {
    color: Color.colorBlack,
  },
  text1: {
    color: Color.colorRoyalblue,
  },
  dontHaveAnAccount: {
    fontWeight: "300",
    fontFamily: FontFamily.poppinsLight,
  },
  dontHaveAnContainer1: {
    lineBreak: "anywhere",
    width: "100%",
  },
  text: {
    fontSize: FontSize.caption_size,
    display: "flex",
    alignItems: "center",
    width: 222,
    textAlign: "center",
  },
  dontHaveAnContainer: {
    top: 690,
  },
  login: {
    borderRadius: Border.br_31xl,
    backgroundColor: Color.colorWhite,
    flex: 1,
    overflow: "hidden",
    height: 926,
    width: "100%",
  },
});

export default Login;