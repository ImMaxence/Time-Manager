import React, { useState, useEffect, useRef } from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, View, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Border, FontSize, FontFamily, Padding, Color } from "../GlobalStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { Alert } from "react-native";

const Profile = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [id, setId] = useState(null)
  const [jwt, setJwt] = useState(null)

  const [error, setError] = useState("")
  const errorTimeoutRef = useRef()

  const getData = async () => {
    try {
      const jwt = await AsyncStorage.getItem('jwt');
      const id = await AsyncStorage.getItem('id');
      const username = await AsyncStorage.getItem('username');
      const email = await AsyncStorage.getItem('email');
      setName(username)
      setEmail(email)
      setId(id)
      setJwt(jwt)
      console.log(id, username)
    } catch (e) {
      console.error('Erreur lors de la récupération de la clé "jwt" :', e);
    }
  }

  const setErrorTemporarily = (message, duration) => {
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }

    setError(message);
    errorTimeoutRef.current = setTimeout(() => {
      setError("");
    }, duration);
  };

  useEffect(() => {
    getData();
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);


  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('jwt');
      await AsyncStorage.removeItem('id');
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('email');

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });

    } catch (e) {
      console.log("error in handleLogout : " + e);
    }
  };

  const updateUser = () => {
    if (name.length <= 0 || email.length <= 0 || password.length <= 0) {
      setErrorTemporarily("All fields must be completed", 5000);
    } else {

      Alert.alert(
        "Confirmation",
        "Are you sure you want to update your profile?",
        [

          {
            text: "Cancel",
            onPress: () => console.log("Update cancelled"),
            style: "cancel"
          },

          {
            text: "OK",
            onPress: async () => {
              try {
                const response = await axios.put(`http://localhost:4000/api/users/${id}`, {
                  user: {
                    username: name,
                    email: email,
                    password: password
                  }
                });
                console.log(response.data);
                Alert.alert("Success", "Your profile has been updated.", [{ text: "OK" }]);
                handleLogout();
              } catch (error) {
                console.error(error);
                Alert.alert("Error", "There was a problem updating your profile.");
              }
            }
          }
        ],
        { cancelable: false }
      );
    }
  };

  const deleteUser = () => {

    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete your profile? This action cannot be undone.",
      [

        {
          text: "Cancel",
          onPress: () => console.log("Deletion cancelled"),
          style: "cancel"
        },

        {
          text: "OK",
          onPress: async () => {
            try {
              const response = await axios.delete(`http://localhost:4000/api/users/${id}`);
              console.log(response.data);
              handleLogout();
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "There was a problem deleting your profile.");
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.profile}>

      <Image
        style={styles.unionIcon}
        contentFit="cover"
        source={require("../assets/union.png")}
      />

      <Image
        style={styles.unionIconv2}
        contentFit="cover"
        source={require("../assets/union.png")}
      />

      <View style={styles.view_prof}>

        <Image
          style={styles.image_p}
          contentFit="cover"
          source={require("../assets/icon16pxaccount1.png")}
        />

        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
          <Pressable onPress={handleLogout}>
            <Text style={styles.deco}>Log out</Text>
          </Pressable>
        </View>

      </View>

      <View style={styles.form}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#595085"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            marginTop={10}
            placeholder="Email"
            placeholderTextColor="#595085"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            marginTop={10}
            placeholder="Password"
            placeholderTextColor="#595085"
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
          <Text style={styles.error}>{error}</Text>
        </View>
      </View>

      <View style={styles.nice_btn}>
        <Pressable style={styles.btn1} onPress={updateUser}>
          <Text style={styles.updatev2}>Update</Text>
        </Pressable>


        <Pressable style={styles.btn2} onPress={deleteUser}>
          <Text style={styles.errorv2}>Delete</Text>
        </Pressable>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  updatev2: {

    fontSize: 12,
    color: "#479696",
    fontWeight: "bold",
  },
  btn1: {
    backgroundColor: "#F5F9F9",
    padding: 10,
    borderRadius: 4
  },
  btn2: {
    backgroundColor: "#FFF4F4",
    padding: 10,
    borderRadius: 4
  },
  errorv2: {

    fontSize: 12,
    color: "#FF7E73",
    fontWeight: "bold"
  },
  error: {

    color: "red",
    fontSize: 10,
    position: "absolute",
    bottom: -30,

  },
  input: {
    height: 60,
    borderWidth: 1,

    width: "100%",
    backgroundColor: "#f5f9f9",
    borderColor: "transparent",
    borderRadius: 5,
    padding: 10,
    fontSize: 14,

  },
  reportSection: {
    marginTop: 20,
    position: "absolute",
  },
  iconLayout: {
    height: 20,
    width: 20,
  },
  iconSpaceBlock: {
    marginLeft: 84,
    height: 20,
  },
  rectangleLayout: {
    height: 128,
    width: 153,
    left: 42,
    position: "absolute",
  },
  groupLayout: {
    borderRadius: Border.br_mini,
    height: 128,
    width: 153,
    left: 0,
    top: 0,
    position: "absolute",
  },
  bonusTypo: {
    width: 113,
    left: 20,
    top: 46,
    fontSize: FontSize.caption_size,
    textAlign: "left",

    fontWeight: "500",
    position: "absolute",
  },
  someTypo1: {
    opacity: 0.5,
    fontSize: FontSize.captionS_size,
    width: 113,
    left: 20,

    textAlign: "left",
    position: "absolute",
  },
  groupViewPosition: {
    left: 204,
    height: 128,
    width: 153,
    position: "absolute",
  },
  someTypo: {
    opacity: 0.7,
    fontSize: FontSize.captionS_size,
    width: 113,
    left: 20,

    textAlign: "left",
    position: "absolute",
  },
  vectorIconLayout: {
    left: "37.44%",
    right: "59.3%",
    width: "3.26%",
    height: "1.93%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  vectorIconPosition: {
    bottom: "38.95%",
    top: "59.12%",
  },
  rectangleParentLayout: {
    height: 30,
    width: 70,
    top: 480,
    position: "absolute",
  },
  groupChildLayout: {
    borderRadius: Border.br_5xs,
    height: 30,
    width: 70,
    left: 0,
    top: 0,
    position: "absolute",
  },
  updateTypo: {

    fontSize: FontSize.caption_size,
    textAlign: "center",
    alignItems: 'center',

    fontWeight: "500",

  },
  lucidepenLineIcon: {
    top: 10,
    left: 0,
    position: "absolute",
    overflow: "hidden",
  },
  mdideleteOutlineIcon: {
    top: 605,
    left: 294,
    position: "absolute",
    overflow: "hidden",
  },
  icon1: {
    height: "100%",
    width: "100%",
  },
  icon2: {
    width: 18,
  },
  user1Icon: {
    width: 20,
    marginLeft: 84,
    overflow: "hidden",
  },
  navbar: {
    top: 840,
    left: 25,
    borderRadius: Border.br_xl,
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
    position: "absolute",
    backgroundColor: Color.colorWhite,
  },
  view_prof: {
    marginTop: 70,
    width: "80%",
    marginLeft: "10%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    gap: 30
  },
  nice_btn: {

    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 60,
    marginTop: 60
  },
  email: {

    fontSize: 14,
    fontWeight: "light",
    color: "#595085",
    opacity: 0.6,
    marginTop: 6
  },
  deco: {

    fontSize: 12,
    textDecorationLine: 'underline',
    color: "#595085",
    marginTop: 6
  },
  name: {

    fontSize: 16,
    fontWeight: "bold",
    color: "#595085",
  },
  image_p: {
    width: 140,
    height: 140,
    backgroundColor: "white",
    borderRadius: "80%"
  },
  unionIcon: {
    width: 430,
    height: 158,
    position: "absolute",
    top: -10,
    left: -70,
  },
  unionIconv2: {
    width: 430,
    height: 158,
    position: "absolute",
    bottom: 0,
    right: -160
  },
  profile1: {
    top: 57,
    left: 164,
    textAlign: "center",
    color: Color.colorDarkslateblue_100,
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  anissaMokrani: {
    textAlign: "left",
    left: 0,
    top: 0,
    color: Color.colorDarkslateblue_100,
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  anissamokraniomfr: {
    top: 23,
    fontSize: FontSize.size_sm,
    opacity: 0.6,
    fontFamily: FontFamily.robotoRegular,
    textAlign: "left",
    left: 0,
    color: Color.colorDarkslateblue_100,
    position: "absolute",
  },
  dconnexion: {
    top: 50,
    textDecorationLine: "underline",
    fontSize: FontSize.caption_size,
    fontFamily: FontFamily.robotoRegular,
    textAlign: "left",
    left: 0,
    color: Color.colorDarkslateblue_100,
    position: "absolute",
  },
  anissaMokraniParent: {
    top: 146,
    left: 180,
    width: 142,
    height: 64,
    position: "absolute",
  },
  myReports: {
    top: 508,
    fontSize: 24,
    fontWeight: "300",
    fontFamily: FontFamily.robotoLight,
    left: 42,
    textAlign: "left",
    color: Color.colorDarkslateblue_100,
    position: "absolute",
  },
  groupChild: {
    backgroundColor: "#f6f5fb",
  },
  anoterGraph: {
    color: Color.colorDarkslateblue_200,
  },
  someShortDescription: {
    top: 84,
    color: Color.colorDarkslateblue_200,
  },
  user81: {
    height: "12.5%",
    width: "10.46%",
    top: "15.63%",
    right: "76.47%",
    bottom: "71.88%",
    left: "13.07%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  rectangleParent: {
    top: 551,
  },
  groupItem: {
    backgroundColor: Color.colorSnow_100,
  },
  absence: {
    color: "#ff5648",
  },
  someShortDescription1: {
    color: "#a27a7a",
    top: 70,
  },
  rectangleGroup: {
    top: 689,
  },
  groupInner: {
    backgroundColor: Color.colorWhitesmoke_100,
  },
  report: {
    color: Color.colorCadetblue,
  },
  someShortDescription2: {
    color: "#8daeae",
    top: 84,
  },
  rectangleContainer: {
    top: 551,
  },
  rectangleView: {
    backgroundColor: "#fdf9fb",
  },
  bonus: {
    color: "#c93f8d",
  },
  someShortDescription3: {
    color: "#e791be",
    top: 70,
  },
  groupView: {
    top: 689,
  },
  vectorIcon: {
    bottom: "38.95%",
    top: "59.12%",
  },
  vectorIcon1: {
    top: "73.93%",
    bottom: "24.14%",
  },
  vectorIcon2: {
    right: "21.63%",
    left: "75.12%",
    width: "3.26%",
    height: "1.93%",
    bottom: "38.95%",
    top: "59.12%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  groupChild1: {
    backgroundColor: Color.colorWhitesmoke_100,
  },
  update: {
    color: Color.colorCadetblue,

    flex: 1,

  },
  rectangleParent1: {
    left: 124,
  },
  groupChild2: {
    backgroundColor: Color.colorSnow_100,
  },
  delete: {
    color: "#ff7e73",
  },
  rectangleParent2: {
    left: 215,
  },
  form: {
    width: "80%",
    marginLeft: "10%",
    marginTop: 60,

  },
  profile: {
    borderRadius: Border.br_31xl,
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.colorWhite,
  },
});

export default Profile;