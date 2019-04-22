import React, { Component } from "react";
import {
    Text,
    View,
} from "react-native";
import {f} from "../../config/config";

class CommentsScreen extends Component {
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
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {this.state.loggedin === true ? (
                    // are logged in
                    <Text>Upload</Text>
                ) : (
                    <View>
                        <Text>You are not logged in</Text>
                        <Text> Please login to upload a photo</Text>
                    </View>
                )}
            </View>
        );
    }
}

export default CommentsScreen;
