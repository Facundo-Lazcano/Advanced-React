import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { setNavigator } from "./src/navigationRef";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";
import reducers from "./src/reducers";

import AuthScreen from "./src/screens/AuthScreen";
import DeckScreen from "./src/screens/DeckScreen";
import MapScreen from "./src/screens/MapScreen";
import ReviewScreen from "./src/screens/ReviewScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

const MainNavigator = createBottomTabNavigator({
  Welcome: WelcomeScreen,
  Auth: AuthScreen,
  Main: createBottomTabNavigator({
    Map: MapScreen,
    Deck: DeckScreen,
    ReviewFlow: createStackNavigator({
      Review: ReviewScreen,
      Settings: SettingsScreen,
    }),
  }),
});

const App = createAppContainer(MainNavigator);

export default () => {
  return (
    <Provider store={store}>
    <App
      ref={(navigator) => {
        setNavigator(navigator);
      }}
    />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
