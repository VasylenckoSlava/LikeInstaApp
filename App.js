/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
} from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
} from "react-navigation";
import FeedScreen from "./src/screens/feed";
import UploadScreen from "./src/screens/upload";
import ProfileScreen from "./src/screens/profile";

const TabStack = createBottomTabNavigator(
  {
    Feeds: { screen: FeedScreen },
    Uploads: { screen: UploadScreen },
    Profiles: { screen: ProfileScreen }
  },

);

const TabNavigator = createAppContainer(TabStack);

export default class App extends Component {
  render() {
    return (
      <TabNavigator
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "blue"
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
