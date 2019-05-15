/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
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
import ExampleScreen from "./src/screens/ExampleCounter/ExampleScreen";

const TabStack = createBottomTabNavigator({
  Feeds: { screen: FeedScreen },
  Upload: { screen: UploadScreen },
  Profiles: { screen: ProfileScreen },
  Example: { screen: ExampleScreen }
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
  constructor(props) {
    super(props);
  }

  render() {
    return <TabNavigator />;
  }
}
