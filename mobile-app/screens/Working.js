import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';

const Working = () => {
  const [items, setItems] = useState({});
  const [id, setId] = useState('');
  const [jwt, setJwt] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const getData = async () => {
    try {
      const jwt = await AsyncStorage.getItem('jwt');
      const id = await AsyncStorage.getItem('id');
      const username = await AsyncStorage.getItem('username');

      setId(id);
      setJwt(jwt);
      console.log('ID:', id);
      console.log('JWT:', jwt);
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!id || !jwt) {
      return;
    }

    axios
      .get(`http://localhost:4000/api/workingtimes/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
        const data = res.data.data;
        const processedData = dataProcessing(data);
        setItems(processedData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching working times:', err);
        setIsLoading(false);
      });
  }, [id, jwt]);

  const dataProcessing = (data) => {
    const processedData = {};
    data.forEach((item) => {
      const date = item.start_time.split('T')[0];
      if (!processedData[date]) {
        processedData[date] = [];
      }

      processedData[date].push({
        name: 'Working Time',
        startTime: item.start_time,
        endTime: item.end_time,
      });
    });

    return processedData;
  };

  return (
    <>

      <View style={styles.dar}>
        <Calendar
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: '#595085' },
          }}
        />
      </View>
      <View style={styles.scroll}>

        {items[selectedDate] && items[selectedDate].length > 0 ? (

          <View style={styles.colum}>
            {
              items[selectedDate].map((item, index) => (
                <View style={styles.card} key={index}>
                  <Text style={styles.titlew}>{item.name}</Text>
                  <Text style={styles.time}>Start Time: {new Date(item.startTime).toLocaleString()}</Text>
                  <Text style={styles.time}>End Time: {new Date(item.endTime).toLocaleString()}</Text>
                </View>

              ))
            }
          </View>

        ) : (
          <>
            <Text style={styles.nodata}>No working times for this date</Text>
          </>
        )
        }

      </View>

    </>
  );
};

const styles = StyleSheet.create({
  colum: {
    width: '100%',
  },
  time: {
    fontSize: 14,
    marginTop: 4
  },
  titlew: {
    fontSize: 14,
    color: "#595085",
    fontWeight: "bold",
    marginBottom: 8
  },
  card: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 6,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    padding: 20

  },
  dar: {

    paddingTop: 60,
    backgroundColor: "white",
  },
  scroll: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: 'center',
    height: "150%",
    paddingTop: 40

  },
  nodata: {
    fontSize: 14,
    color: "#595085",
    fontWeight: "bold"
  },
  container: {

    backgroundColor: "red"
  },
  emptyDate: {
    position: "absolute",
    bottom: 10,

    paddingTop: 30,
  },
});

export default Working;