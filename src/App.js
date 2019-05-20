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
import FeedScreen from "./screens/Feed";
import UploadScreen from "./screens/Upload";
import ProfileScreen from "./screens/Profile";
import UserProfileScreen from "./screens/UserProfile";
import CommentsScreen from "./screens/Comments";
import ExampleScreen from "./screens/ExampleCounter/ExampleScreen";

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
  render() {
    return <TabNavigator />;
  }
}
