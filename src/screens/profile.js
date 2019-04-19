import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableHighlight
} from "react-native";
import { f, auth, database, storage } from "../../config/config.js";

class ProfileScreen extends Component {
  state = {
    loggedin: false
  };
  componentDidMount() {
    const that = this;

    f.auth().onAuthStateChanged(function(user) {
      if (user) {
        //Logged in
        that.setState({
          loggedin: true
        });
      } else {
        // Not logged in
        that.setState({
          loggedin: false
        });
      }
    });
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {this.state.loggedin === true ? (
          // are logged in
          <Text>Profile</Text>
        ) : (
          <View>
            <Text>You are not logged in</Text>
            <Text> Please login to view your profile</Text>
          </View>
        )}
      </View>
    );
  }
}

export default ProfileScreen;
