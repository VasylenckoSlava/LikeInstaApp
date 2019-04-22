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

class FeedScreen extends Component {
  state = {
    photo_feed: [],
    refresh: false,
    loading: true
  };

  componentDidMount() {
    this.loadFeed();
  }

  pluralCheck = s => {
    if (s === 1) {
      return " ago";
    } else {
      return "s ago";
    }
  };

  timeConverter = timestamp => {
    const a = new Date(timestamp * 1000);
    const seconds = Math.floor((new Date() - a) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " year" + this.pluralCheck(interval);
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " month" + this.pluralCheck(interval);
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " day" + this.pluralCheck(interval);
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hour" + this.pluralCheck(interval);
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minute" + this.pluralCheck(interval);
    }
    return Math.floor(seconds) + " seconds" + this.pluralCheck(interval);
  };

  loadFeed = () => {
    this.setState({
      refresh: true,
      photo_feed: []
    });
    var that = this;

    database
      .ref("photos")
      .orderByChild("posted")
      .once("value")
      .then(function(snapshot) {
        const exists = snapshot.val() !== null;
        if (exists) data = snapshot.val();

        var photo_feed = that.state.photo_feed;

        for (var photo in data) {
          var photoObj = data[photo];
          database.ref("users").child(photoObj.author).child('username')
            .once("value")
            .then(function(snapshot) {
              var exists = snapshot.val() !== null;
              if (exists) data = snapshot.val();

      photo_feed.push({
        id: photo,
        url: photoObj.url,
        caption: photoObj.caption,
        posted: that.timeConverter(photoObj.posted),
        author: data,
        authorId: photoObj.author
      });

              that.setState({
                refresh: false,
                loading: false
              });
            })
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error));
  };

  loadNew = () => {
    this.loadFeed();
  };

  render() {
    const { refresh, photo_feed, loading } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.topScreenName}>
          <Text>Feed</Text>
        </View>
        {loading === true ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Loading....</Text>
          </View>
        ) : (
          <FlatList
            refreshing={refresh}
            onRefresh={this.loadNew}
            data={photo_feed}
            keyExtractor={(item, index) => index.toString()}
            style={{ flex: 1, backgroundColor: "#eee" }}
            renderItem={({ item, index }) => (
              <View key={index} style={styles.contentInFlatList}>
                <View style={styles.descriptionHeaderPhoto}>
                  <Text>{item.posted}</Text>

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("User", {
                        userId: item.authorId
                      })
                    }
                  >
                    <Text>{item.author}</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <Image
                    source={{ uri: item.url }}
                    style={styles.imageStyles}
                  />
                </View>

                <View style={styles.descriptionBottomPhoto}>
                  <Text>{item.caption}</Text>
                  <Text style={styles.comments}>View comments</Text>
                </View>
              </View>
            )}
          />
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
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  imageStyles: {
    resizeMode: "cover",
    width: "100%",
    height: 275
  },
  contentInFlatList: {
    width: "100%",
    overflow: "hidden",
    marginBottom: 5,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "grey"
  },
  descriptionHeaderPhoto: {
    padding: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  descriptionBottomPhoto: {
    padding: 5
  },
  comments: {
    marginTop: 10,
    textAlign: "center"
  }
});

export default FeedScreen;
