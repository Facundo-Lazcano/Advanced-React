import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Button } from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Slides = ({ data }) => {
  renderButton = (index) => {
    if (index === data.length - 1) {
      return (
        <Button
          buttonStyle={styles.button}
          title="Onwards"
          raised
          onPress={onSlidesComplete}
        />
      );
    }
  };

  renderSlides = () => {
    return data.map((slide, index) => {
      return (
        <View
          key={slide.text}
          style={[styles.slide, { backgroundColor: slide.color }]}
        >
          <Text style={styles.slideText}> {slide.text}</Text>
          {renderButton(index)}
        </View>
      );
    });
  };

  return (
    <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
      {renderSlides()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  slideText: {
    fontSize: 30,
    textAlign: "center",
    color: "#ffffff",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
    padding: 3,
  },
  button: {
    backgroundColor: "#0288D1",
  },
});

export default Slides;
