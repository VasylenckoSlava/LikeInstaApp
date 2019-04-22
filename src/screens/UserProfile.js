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

class UserProfileScreen extends Component {
  state = {
    loaded: false
  };

  checkParams = () => {
    //const { navigation } = this.props;
    const params = this.props.navigation.state.params;
    if (params) {
      if (params.userId) {
        this.setState({
          userId: params.userId
        });
        this.fetchUserInfo(params.userId);
      }
    }
  };

  fetchUserInfo = userId => {
    database
      .ref("users")
      .child(userId)
      .child("username")
      .once("value")
      .then(snapshot => {
        const exists = snapshot.val() !== null;
        if (exists) data = snapshot.val();
        this.setState({
          username: data
        });
      })
      .catch(error => console.log(error));

    database
      .ref("users")
      .child(userId)
      .child("name")
      .once("value")
      .then(snapshot => {
        const exists = snapshot.val() !== null;
        if (exists) data = snapshot.val();
        this.setState({
          name: data
        });
      })
      .catch(error => console.log(error));

    database
      .ref("users")
      .child(userId)
      .child("avatar")
      .once("value")
      .then(snapshot => {
        const exists = snapshot.val() !== null;
        if (exists) data = snapshot.val();
        this.setState({
          avatar: data,
          loaded: true
        });
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    this.checkParams();
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.loaded === false ? (
          <View>
            <Text>Loading....</Text>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={styles.topScreenName}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={styles.goBackButton}
              >
                <Text style={styles.goBackButtonText}>Go Back</Text>
              </TouchableOpacity>
              <Text>Profile</Text>
            </View>

            <View style={styles.imageContainer}>
              <Image source={{ uri: this.state.avatar }} style={styles.image} />

              <View style={{ marginRight: 10 }}>
                <Text>{this.state.name}</Text>
                <Text>{this.state.username}</Text>
              </View>
            </View>
            <View style={styles.loadingPhotos}>
              <Text>Loading photos....</Text>
            </View>
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
    flexDirection: "row",
    height: 70,
    paddingTop: 30,
    backgroundColor: "white",
    borderColor: "lightgrey",
    borderBottomWidth: 0.5,
    justifyContent: "space-between",
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
  goBackButton: {
    width: 100
  },
  goBackButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    paddingLeft: 10
  },
  loadingPhotos: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green"
  }
});

export default UserProfileScreen;
