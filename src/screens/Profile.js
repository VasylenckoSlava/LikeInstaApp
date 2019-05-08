import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import { f, auth, database, storage } from "../../config/config.js";
import PhotoList from "../components/photoList";
import UserAuth from "../components/auth";

class ProfileScreen extends Component {
  state = {
    loggedin: false
  };

  fetchUserInfo = userId => {
    var that = this;
    database
      .ref("users")
      .child(userId)
      .once("value")
      .then(function(snapshot) {
        const exists = snapshot.val() !== null;
        if (exists) var data = snapshot.val();
        that.setState({
          username: data.username,
          name: data.name,
          avatar: data.avatar,
          loggedin: true,
          userId: userId
        });
      });
  };

  componentDidMount() {
    var that = this;

    f.auth().onAuthStateChanged(function(user) {
      if (user) {
        //Logged in
        that.fetchUserInfo(user.uid);
      } else {
        // Not logged in
        that.setState({
          loggedin: false
        });
      }
    });
  }

  logoutUser = () => {
    f.auth().signOut();
    alert("Logged Out");
  };

  editProfile = () => {
    this.setState({
      editingProfile: true
    });
  };

    saveProfile = () => {
      var name = this.state.name;
      var username = this.state.username;

      if(name !== ''){
        database.ref('users').child(this.state.userId).child('name').set(name);
      }

        if(username !== ''){
            database.ref('users').child(this.state.userId).child('username').set(username);
        }
        this.setState({
          editingProfile: false
        });
    };

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
                  uri: this.state.avatar
                }}
                style={styles.image}
              />

              <View style={{ marginRight: 10 }}>
                <Text>{this.state.name}</Text>
                <Text>{this.state.username}</Text>
              </View>
            </View>

            {this.state.editingProfile === true ? (
              <View style={styles.editProfileView}>
                <TouchableOpacity
                  onPress={() => this.setState({ editingProfile: false })}
                >
                  <Text style={{ fontWeight: "bold" }}>Cancel Editing</Text>
                </TouchableOpacity>
                <Text>Name:</Text>
                <TextInput
                  editable
                  placeholder={"Enter your name"}
                  onChangeText={text => this.setState({ name: text })}
                  value={this.state.name}
                  style={{width:250, marginVertical:10, padding: 5, borderColor:'grey',borderWidth: 1, borderRadius:5}}
                />
                  <Text>Username:</Text>
                  <TextInput
                      editable
                      placeholder={"Enter your username"}
                      onChangeText={text => this.setState({ username: text })}
                      value={this.state.username}
                      style={{width:250, marginVertical:10, padding: 5, borderColor:'grey',borderWidth: 1,borderRadius:5}}
                  />
                  <TouchableOpacity
                      onPress={() => this.saveProfile()}
                      style={{backgroundColor: 'blue', padding: 10,borderRadius:5}}
                  >
                      <Text style={{ fontWeight: "bold", color:'white' }}>Save Changes</Text>
                  </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.buttonsBlock}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.logoutUser()}
                >
                  <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.editProfile()}
                >
                  <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "grey" }]}
                  onPress={() => navigation.navigate("Uploads")}
                >
                  <Text style={[styles.buttonText, { color: "black" }]}>
                    Upload New +
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <PhotoList
              isUser={true}
              userId={this.state.userId}
              navigation={this.props.navigation}
            />
          </View>
        ) : (
         <UserAuth message={'Please login to view your profile'} />
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
  editProfileView: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    alignItems: "center"
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
