import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { f, auth, database, storage } from "../../config/config.js";
import PhotoList from "../components/photoList";

class FeedScreen extends Component {
  state = {
    photo_feed: [],
    refresh: false,
    loading: true
  };

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topScreenName}>
          <Text>Feed</Text>
        </View>
          <PhotoList isUser={false}  navigation={this.props.navigation} />
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
  }
});

export default FeedScreen;
