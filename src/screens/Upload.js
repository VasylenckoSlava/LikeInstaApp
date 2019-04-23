import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image
} from "react-native";
import ImagePicker from "react-native-image-picker";
import { f, storage } from "../../config/config";

class UploadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      imageId: this.uniqueId(),
      imageSelected: false,
      uploading: false,
      caption: "",
      progress: 0
    };
  }

  // _checkPermissions = async () => {
  //   const { status } = await PermissionsAndroid.askAsync(PERMISSIONS.CAMERA);
  //   this.setState({camera: status});
  //     const { statusRoll } = await PermissionsAndroid.askAsync(PERMISSIONS.CAMERA_ROOL);
  //     this.setState({
  //         camera: statusRoll
  //     });
  // };

  s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  uniqueId = () => {
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4()
    );
  };

  findNewImage = () => {
    //this._checkPermissions()

    //  let result = await ImagePicker.launchImageLibrary({
    //      mediaType: "photo",
    //      allowsEditing: true,
    //      quality: 1
    //  });
    // console.log('result',result)
    ImagePicker.showImagePicker({ title: "Picked an Image" }, res => {
      if (res.didCancel) {
        console.log("User cancelled");
        this.setState({
          imageSelected: false
        });
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          imageSelected: true,
          imageId: this.uniqueId(),
          uri: res.uri
        });
        // this.uploadImage(res.uri);
      }
    });
  };

  uploadPublish = () => {
    if (this.state.caption !== "") {
      this.uploadImage(this.state.uri);
    } else {
      alert("Please enter a caption...");
    }
  };

  uploadImage = async uri => {
    var that = this;
    var userid = f.auth().currentUser.uid;
    var imageId = this.state.imageId;

    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(uri)[1];
    this.setState({
      currentFileType: ext,
      uploading: true
    });
    const response = await fetch(uri);
    const blob = await response.blob();
    var FilePath = imageId + "." + that.state.currentFileType;

    var uploadTask = storage
      .ref("user/" + userid + "/img")
      .child(FilePath)
      .put(blob);

    uploadTask.on("state_changed", function(snapshot) {
      var progress = (
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
      console.log("upoald is" + progress);
      that.setState({
        progress: progress
      });
    },function (error) {
        console.log('error with upload- ' + error);
    },function(){
      //complete
        that.setState({progress:100});
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log(downloadURL)
          alert(downloadURL)
        })
    });

    // var snapshot = ref.put(blob).on("state_changed", snapshot => {
    //   console.log("Progress", snapshot.bytesTransferred, snapshot.totalBytes);
    // });
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
      <View style={styles.container}>
        {this.state.loggedin === true ? (
          // are logged in
          <View style={{ flex: 1 }}>
            {this.state.imageSelected === true ? (
              <View
                style={[styles.container, { backgroundColor: "lightgrey" }]}
              >
                <View style={styles.topScreenName}>
                  <Text>Upload</Text>
                </View>
                <View style={styles.textTextInputStyle}>
                  <Text style={styles.textCaption}>Caption:</Text>
                  <TextInput
                    editable={true}
                    placeholder={"Enter your caption..."}
                    maxLength={150}
                    multiline={true}
                    numberOfLine={4}
                    onChangeText={text => this.setState({ caption: text })}
                    style={styles.textInputCaption}
                  />
                  <TouchableOpacity
                    onPress={() => this.uploadPublish()}
                    style={styles.uploadButton}
                  >
                    <Text style={styles.textUploadPublish}>
                      Upload & Publish
                    </Text>
                  </TouchableOpacity>
                  {this.state.uploading === true ? (
                    <View style={{ marginTop: 10 }}>
                      <Text>{this.state.progress}%</Text>
                      {this.state.progress !== 100 ? (
                        <ActivityIndicator size="small" color="blue" />
                      ) : (
                        <Text>Processing</Text>
                      )}
                    </View>
                  ) : (
                    <View></View>
                  )}

                  <Image
                    source={{ uri: this.state.uri }}
                    style={{
                      marginTop: 10,
                      resizeMode: "cover",
                      width: "100%",
                      height: 275
                    }}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.text}>
                <Text style={styles.textUpload}>Upload</Text>
                <TouchableOpacity
                  style={styles.buttonSelectPhoto}
                  onPress={() => this.findNewImage()}
                >
                  <Text style={{ color: "white" }}>Select photo</Text>
                </TouchableOpacity>
              </View>
            )}
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
  topScreenName: {
    height: 70,
    paddingTop: 30,
    backgroundColor: "white",
    borderColor: "lightgrey",
    borderBottomWidth: 0.5,
    justifyContent: "center",
    alignItems: "center"
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
  uploadButton: {
    alignSelf: "center",
    width: 170,
    marginHorizontal: "auto",
    backgroundColor: "purple",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  buttonSelectPhoto: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "blue",
    borderRadius: 5
  },
  textUploadPublish: {
    textAlign: "center",
    color: "white"
  },
  textTextInputStyle: {
    padding: 5
  },
  textCaption: {
    marginTop: 5
  },
  textInputCaption: {
    marginVertical: 10,
    height: 100,
    padding: 5,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "white",
    color: "black"
  }
});

export default UploadScreen;
