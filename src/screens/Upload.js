import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert, PermissionsAndroid, ImagePickerIOS } from "react-native";
import ImagePicker from 'react-native-image-picker';
import { f, storage } from "../../config/config";

class UploadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      imageId: this.uniqueId(),
      pickedImage: null
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

  findNewImage =() => {
      //this._checkPermissions()

  //  let result = await ImagePicker.launchImageLibrary({
  //      mediaType: "photo",
  //      allowsEditing: true,
  //      quality: 1
  //  });
  // console.log('result',result)
      ImagePicker.showImagePicker({title:'Picked an Image'}, res => {
        if(res.didCancel){
          console.log('User cancelled')
        } else if (res.error){
          console.log("Error", res.error)
        } else {
          // this.setState({
          //     pickedImage:{uri: res.uri}
          // })
        this.uploadImage(res.uri)

        }
      });
  };

  uploadImage = async(uri) => {
   var that = this;
   var userid = f.auth().currentUser.uid;
   var imageId = this.state.imageId;

   var re = /(?:\.([^.]+))?$/;
   var ext = re.exec(uri)[1];
   this.setState({
       currentFileType: ext
   });
      const response = await fetch(uri);
   const blob = await response.blob();
   var FilePath = imageId+'.'+that.state.currentFileType;

      const ref = storage.ref('user/' + userid +'/img').child(FilePath);

   var snapshot = ref.put(blob).on('state_changed', snapshot => {
     console.log("Progress", snapshot.bytesTransferred, snapshot.totalBytes);
   })
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
