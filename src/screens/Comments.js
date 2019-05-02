import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  FlatList
} from "react-native";
import { f, database } from "../../config/config";

class CommentsScreen extends Component {
  state = {
    loggedin: false,
    comments_list: []
  };

  checkParams = () => {
    const { navigation } = this.props;
    const params = navigation.state.params;
    if (params) {
      if (params.photoId) {
        this.setState({
          photoId: params.photoId
        });
        this.fetchComments(params.photoId);
      }
    }
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
    this.checkParams();
  }

  addCommentToList = (comments_list, data, comment) => {
    console.log("comments_list, data, comment", comments_list, data, comment);
    var that = this;
    var commentObj = data[comment];
    database
      .ref("users")
      .child(commentObj.author)
      .child("username")
      .once("value")
      .then(function(snapshot) {
        const exists = snapshot.val() !== null;
        if (exists) var data = snapshot.val();

        comments_list.push({
          id: comment,
          comment: commentObj.comment,
          posted: that.timeConverter(commentObj.posted),
          author: data,
          authorId: commentObj.author
        });

        that.setState({
          refresh: false,
          loading: false
        });
      })
      .catch(error => console.log(error));
  };

  fetchComments = photoId => {
    var that = this;

    database
      .ref("comments")
      .child(photoId)
      .orderByChild("posted")
      .once("value")
      .then(function(snapshot) {
        const exists = snapshot.val() !== null;
        if (exists) {
          var data = snapshot.val();
          var comments_list = that.state.comments_list;
          for (var comment in data) {
            that.addCommentToList(comments_list, data, comment);
          }
        } else {
          that.setState({
            comments_list: []
          });
        }
      })
      .catch(error => console.log(error));
  };

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

  postComment = () => {};

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "lightgrey" }}>
        <View style={styles.topScreenName}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.goBackButton}
          >
            <Text style={styles.goBackButtonText}>Go Back</Text>
          </TouchableOpacity>
          <View style={styles.textPosition}>
            <Text>Comments</Text>
          </View>
        </View>

        <View style={styles.imageContainer}>
          {/*<Image source={{ uri: this.state.avatar }} style={styles.image} />*/}

          <View style={{ marginRight: 10 }}>
            <Text>{this.state.name}</Text>
            <Text>{this.state.username}</Text>
          </View>
        </View>
        {this.state.comments_list.length === 0 ? (
          // no comments
          <Text>No Comments ...</Text>
        ) : (
          //are comments
          <FlatList
            data={this.state.comments_list}
            refreshing={this.state.refresh}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatList}
            renderItem={({ item, index }) => (
              <View key={index} style={styles.flatListItem}>
                <View style={styles.commentDescription}>
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

                <View style={{ padding: 5 }}>
                  <Text>{item.comment}</Text>
                </View>
              </View>
            )}
          />
        )}
        {this.state.loggedin === true ? (
          // are logged in
          <KeyboardAvoidingView
            behavior="padding"
            enabled
            style={styles.keyboard}
          >
            <Text style={{ fontWeight: "bold" }}>Post Comment</Text>
            <View>
              <TextInput
                editable
                placeholder="Enter your comment here .."
                onChangeText={text => this.setState({ comment: text })}
                style={styles.textInput}
              />
              <TouchableOpacity onPress={() => this.postComment()}>
                <Text>Post</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        ) : (
          <View>
            <Text>You are not logged in</Text>
            <Text> Please login to post a comment</Text>
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
  imageContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10
  },
  image: {
    marginLeft: 10,
    width: "100%",
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
  flatList: {
    flex: 1,
    backgroundColor: "#eee"
  },
  flatListItem: {
    width: "100%",
    overflow: "hidden",
    marginBottom: 5,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "grey"
  },
  commentDescription: {
    padding: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textPosition: {
    flex: 1,
    marginLeft: 54
  },
  keyboard: {
    borderTopWidth: 1,
    borderTopColor: "grey",
    padding: 10,
    marginBottom: 15
  },
  textInput: {
    marginVertical: 10,
    height: 50,
    padding: 5,
    borderColor: "grey",
    borderRadius: 3,
    backgroundColor: "white",
    color: "black"
  }
});

export default CommentsScreen;
