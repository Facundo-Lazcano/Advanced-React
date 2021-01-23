import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import MapView from "react-native-maps";
import { connect } from "react-redux";
import { fetchJobs } from "../actions/index";



const PHONE_WIDTH = Dimensions.get("window").width;
const PHONE_HEIGHT = Dimensions.get("window").height;

const MapScreen = ({fetchJobs, navigation: {navigate}}) => {
  const [region, setRegion] = useState({
    longitude: -122,
    latitude: 37,
    longitudeDelta: 0.04,
    latitudeDelta: 0.09,
  });

  
  

  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  onRegionChangeComplete = (region) => {
    setRegion(region);
  };

  onButtonPress = () => {
    fetchJobs(region.latitude, region.longitude, () =>{
      navigate('Deck')
    });
  };

  if (!mapLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Find Jobs Here"
          icon={{ name: "search" }}
          onPress={onButtonPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: PHONE_WIDTH,
    height: PHONE_HEIGHT,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
});

export default connect(null, { fetchJobs })(MapScreen);
