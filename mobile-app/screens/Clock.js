import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClockContainer from "../components/ClockContainer";
import { Color, FontFamily, Border } from "../GlobalStyles";

const Clock = () => {

  const [id, setId] = useState('');
  const [jwt, setJwt] = useState('');
  const [clockData, setClockData] = useState(null);

  const [clockGet, setClockGet] = useState(null);

  const [act, setAct] = useState({
    actual: { day: "", month: "", number: "" },
  });

  const [timer, setTimer] = useState(0);


  const [buttonColor, setButtonColor] = useState("transparent");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = await AsyncStorage.getItem('jwt');
        const id = await AsyncStorage.getItem('id');

        setId(id);
        setJwt(jwt);

        const response = await axios.get(`http://localhost:4000/api/clocks/${id}`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });

        console.log('Clock data:', response.data.data);

        const clockData = response.data.data[0];

        setAct((prevWorkingTimes) => {
          const up = { ...prevWorkingTimes };

          up.actual.day = ""
          up.actual.month = ""
          up.actual.number = ""

          switch (new Date(clockData.time).getDay()) {
            case 0:
              up.actual.day = "Sunday"
              break
            case 1:
              up.actual.day = "Monday"
              break
            case 2:
              up.actual.day = "Tuesday"
              break
            case 3:
              up.actual.day = "Wednesday"
              break
            case 4:
              up.actual.day = "Thursday"
              break
            case 5:
              up.actual.day = "Friday"
              break
            case 6:
              up.actual.day = "Saturday"
              break
          }

          switch (new Date(clockData.time).getMonth()) {
            case 0:
              up.actual.month = "January"
              break;
            case 1:
              up.actual.month = "February"
              break;
            case 2:
              up.actual.month = "March"
              break;
            case 3:
              up.actual.month = "April"
              break;
            case 4:
              up.actual.month = "May"
              break;
            case 5:
              up.actual.month = "June"
              break;
            case 6:
              up.actual.month = "July"
              break;
            case 7:
              up.actual.month = "August"
              break;
            case 8:
              up.actual.month = "September"
              break;
            case 9:
              up.actual.month = "October"
              break;
            case 10:
              up.actual.month = "November"
              break;
            case 11:
              up.actual.month = "December"
              break;
          }

          up.actual.number = new Date(clockData.time).getDate()

          return up;
        });

        setClockGet(clockData);

        setButtonColor(clockData.status ? '#479696' : '#FF7E73');

      } catch (error) {

        console.error('Error fetching data:', error);
      }
    };


    fetchData();
  }, [id, jwt]);

  const createClock = async () => {
    try {

      const response = await axios.post(
        `http://localhost:4000/api/clocks/${id}`,
        null,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );


      console.log('Clock created:', response.data);
      console.log('Clock status:', response.data.data.status);
      setClockData(response.data.data);
      setButtonColor(response.data.data.status ? "#479696" : "#FF7E73");
      setClockGet({
        status: response.data.data.status,
        time: response.data.data.time,
      });

    } catch (error) {
      console.error('Error creating clock:', error);
    }
  };

  useEffect(() => {
    let interval;
    if (clockGet && clockGet.status) {
      interval = setInterval(() => {
        setTimer(prevTime => prevTime + 1);
      }, 1000);
    } else {
      setTimer(0);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [clockGet]);


  return (
    <View style={styles.clock}>
      <View style={styles.background} />
      <Image
        style={[styles.objectsIcon, styles.backgroundPosition]}
        contentFit="cover"
        source={require('../assets/objects2.png')}
      />
      <View style={styles.header}>
        <ClockContainer />
      </View>

      <View style={styles.spebtn}>

        {
          clockGet && (
            <View style={styles.clockDataContainer}>
              <Text style={styles.datedatedate}>
                {act.actual.day} {act.actual.number} {act.actual.month}
              </Text>
              {clockGet && clockGet.status && (
                <Text style={styles.timerText}>
                  {new Date(timer * 1000).toISOString().substr(11, 8)}
                </Text>
              )}
            </View>

          )
        }

        <Pressable
          style={[styles.buttonContainer, { backgroundColor: buttonColor, }]}
          onPress={createClock}
        >
          {
            clockGet && (

              <Text style={styles.datedatedatev2}>{clockGet.status ? 'Active' : 'Inactive'}</Text>

            )
          }
        </Pressable>
      </View>

    </View >

  );
};

const styles = StyleSheet.create({
  timerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  datedatedatev2: {
    textAlign: "center",
    fontSize: 16,
    color: "black"
  },
  datedatedate: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clockDataContainer: {
    width: "100%",
    marginBottom: 40
  },
  spebtn: {
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

  },
  clockPosition: {
    top: 346,
    position: "absolute",
  },
  textClr: {
    color: Color.colorBlack,
    position: "absolute",
  },
  clockInnerLayout: {
    width: 36,
    position: "absolute",
  },
  ellipseIconLayout: {
    height: 116,
    width: 116,
    position: "absolute",
  },
  background: {
    top: -86,
    left: 1,
    width: 428,
    position: "absolute",
    height: 926,
  },
  objectsIcon: {
    top: 0,
    left: 0,
    width: 1113,
    height: 1431,
    position: "absolute",
  },
  backgroundPosition: {
    left: -400,
    top: -420,
    position: "absolute",
  },
  header: {
    top: 97,
    left: 115,
    width: 189,
    height: 45,
    position: "absolute",
  },
  clockChild: {
    left: 78,
    width: 268,
    height: 258,
  },
  text: {
    marginLeft: -47,
    top: 445,
    left: "50%",
    fontSize: 40,
    fontFamily: FontFamily.assistantRegular,
    textAlign: "center",
  },
  clockItem: {
    left: 82,
    borderRadius: 25,
    width: 243,
    height: 250,
  },
  clockInner: {
    top: 404,
    left: 301,
    height: 35,
  },
  may2Friday: {
    top: 279,
    left: 156,
    fontSize: 18,
    fontFamily: FontFamily.robotoRegular,
    textAlign: "left",
  },
  ellipseIcon: {
    top: 617,
    left: 105,
  },
  clockChild1: {
    top: 619,
    left: 214,
  },
  materialSymbolspauseIcon: {
    top: 661,
    left: 256,
    height: 32,
    overflow: "hidden",
  },
  vectorIcon: {
    top: 664,
    left: 155,
    width: 18,
    height: 23,
    position: "absolute",
  },
  clock: {
    borderRadius: Border.br_31xl,
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    overflow: "hidden",
    height: 926,
  },
  buttonContainer: {
    borderRadius: 100,
    width: 180,
    height: 180,
    backgroundColor: "grey",
    justifyContent: "center",
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});

export default Clock;

