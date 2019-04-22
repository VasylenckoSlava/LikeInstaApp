/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import { auth } from "./config/config";
import FeedScreen from "./src/screens/Feed";
import UploadScreen from "./src/screens/Upload";
import ProfileScreen from "./src/screens/Profile";
import UserProfileScreen from "./src/screens/UserProfile";
import CommentsScreen from "./src/screens/Comments";

const TabStack = createBottomTabNavigator({
  Feeds: { screen: FeedScreen },
  Upload: { screen: UploadScreen },
  Profiles: { screen: ProfileScreen }
});

const MainStack = createStackNavigator(
  {
    Home: { screen: TabStack },
    User: { screen: UserProfileScreen },
    Comments: { screen: CommentsScreen }
  },
  {
    initialRouteName: "Home",
    mode: "modal",
    headerMode: "none"
  }
);

const TabNavigator = createAppContainer(MainStack);

export default class App extends Component {
  login = async () => {
    try {
      let user = await auth.signInWithEmailAndPassword(
        "testtomych@user.com",
        "password"
      );
    } catch (error) {
      console.log(error);
    }
  };

  constructor(props) {
    super(props);
    this.login();
  }

  render() {
    return <TabNavigator />;
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
