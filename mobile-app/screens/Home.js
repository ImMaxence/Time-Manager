import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, StatusBar, ScrollView } from 'react-native';
import Clock from './Clock';
import Working from './Working';
import Profile from './Profile';

const Home = () => {

  const [displayedWidget, setDisplayedWidget] = useState('Home');

  const navigateToHome = () => {
    setDisplayedWidget('Home');
  };
  const navigateToHistory = () => {
    setDisplayedWidget('Working');
  };
  const navigateToProfile = () => {
    setDisplayedWidget('Profile');
  };

  const getIconSource = (widget) => {
    if (widget === 'Home') {
      return displayedWidget === 'Home' ? require('../assets/icon3x.png') : require('../assets/icon3.png');
    }
    if (widget === 'Working') {
      return displayedWidget === 'Working' ? require('../assets/icon4.png') : require('../assets/icon1.png');
    }
    if (widget === 'Profile') {
      return displayedWidget === 'Profile' ? require('../assets/user-11.png') : require('../assets/user-1.png');
    }
  };

  return (
    <View style={styles.container}>

      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ScrollView style={styles.scrollView}>
        {displayedWidget === 'Home' && <Clock />}
        {displayedWidget === 'Working' && <Working />}
        {displayedWidget === 'Profile' && <Profile />}
      </ScrollView>
      <View style={styles.bottomCard}>
        <TouchableOpacity style={styles.button} onPress={navigateToHome}>
          <Image source={getIconSource('Home')} style={styles.image} resizeMode="contain" />
        </TouchableOpacity>
        <View style={styles.separator}></View>
        <TouchableOpacity style={styles.button} onPress={navigateToHistory}>
          <Image source={getIconSource('Working')} style={styles.image} resizeMode="contain" />
        </TouchableOpacity>
        <View style={styles.separator}></View>
        <TouchableOpacity style={styles.button} onPress={navigateToProfile}>
          <Image source={getIconSource('Profile')} style={styles.image} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  scrollView: {
    flex: 1,
  },
  bottomCard: {
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: '80%',
    marginLeft: '10%',
    paddingTop: 30,
    paddingBottom: 30,
    elevation: 4,
    borderRadius: 15,
    height: 50,

    flexDirection: 'row',

    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 30
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: 2,
    height: 65,
    marginHorizontal: 10,
  },
  image: {
    width: 25,
    height: 25,
  },
});

export default Home;
