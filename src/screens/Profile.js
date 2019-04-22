import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity
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
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        {this.state.loggedin === true ? (
          // are logged in
          <View style={{ flex: 1 }}>
            <View style={styles.topScreenName}>
              <Text>Profile</Text>
            </View>

            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: "https://api.adorable.io/avatars/285/test@user.i.png"
                }}
                style={styles.image}
              />

              <View style={{ marginRight: 10 }}>
                <Text>Name</Text>
                <Text>UserName</Text>
              </View>
            </View>

            <View style={styles.buttonsBlock}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "grey" }]}
                onPress={() => navigation.navigate("Uploads")}
              >
                <Text style={[styles.buttonText, { color: "white" }]}>
                  Upload New +
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.loadingPhotos}>
              <Text>Loading photos....</Text>
            </View>

          </View>
        ) : (
          <View style={styles.notLoggedInContainer}>
            <Text>You are not logged in</Text>
            <Text> Please login to view your profile</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topScreenName: {
    height: 70,
    paddingTop: 30,
    backgroundColor: "white",
    borderColor: "lightgrey",
    borderBottomWidth: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  notLoggedInContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10
  },
  image: {
    marginLeft: 10,
    width: 100,
    height: 100,
    borderRadius: 50
  },
  buttonsBlock: {
    paddingBottom: 20,
    borderBottomWidth: 1
  },
  button: {
    marginTop: 10,
    marginHorizontal: 40,
    paddingVertical: 15,
    borderWidth: 1.5,
    borderColor: "grey",
    borderRadius: 20
  },
  buttonText: {
    textAlign: "center",
    color: "grey"
  },
  loadingPhotos: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green"
  }
});

export default ProfileScreen;
