import React, { Component } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";

class FeedScreen extends Component {
  state = {
    photo_feed: [0, 1, 2, 3, 4],
    refresh: false
  };

  loadNew = () => {
    this.setState({
      refresh: true
    });
    this.setState({
      photo_feed: [5, 6, 7, 8, 9],
      refresh: false
    });
  };

  render() {
    const { refresh, photo_feed } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.topScreenName}>
          <Text>Feed</Text>
        </View>

        <FlatList
          refreshing={refresh}
          onRefresh={this.loadNew}
          data={photo_feed}
          keyExtractor={(item, index) => index.toString()}
          style={{ flex: 1, backgroundColor: "#eee" }}
          renderItem={({ item, index }) => (
            <View key={index}>
              <View>
                <Text>Time Ago</Text>
                <Text>@Rusty</Text>
              </View>

              <View>
                <Image
                  source={{
                    uri:
                      "https://source.unsplash.com/random/500x" +
                      Math.floor(Math.random() * 800 + 500)
                  }}
                  style={styles.imageStyles}
                />
              </View>

              <View>
                <Text>Caption text here...</Text>
                <Text>View comments</Text>
              </View>
            </View>
          )}
        />
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
  }
});

export default FeedScreen;
