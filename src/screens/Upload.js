import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { f } from "../../config/config";

class UploadScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedin: false,
            imageId: this.uniqueId()
        };
        Alert.alert(this.uniqueId())
    }


  s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  uniqueId = () => {
      console.log('s4', this.s4())
    return (this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" +
      this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4()
    );
  };

  findNewImage = () => {};

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
      <View style={styles.container}>
        {this.state.loggedin === true ? (
          // are logged in
          <View style={styles.text}>
            <Text style={styles.textUpload}>Upload</Text>
            <TouchableOpacity
              style={styles.buttonSelectPhoto}
              onPress={() => this.findNewImage()}
            >
              <Text style={{ color: "white" }}>Select photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.text}>
            <Text>You are not logged in</Text>
            <Text> Please login to upload a photo</Text>
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
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textUpload: {
    fontSize: 28,
    paddingBottom: 15
  },
  buttonSelectPhoto: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "blue",
    borderRadius: 5
  }
});

export default UploadScreen;
