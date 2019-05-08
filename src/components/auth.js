import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";
import {f, database, auth} from "../../config/config";

class UserAuth extends Component {
  state = {
    authStep: 0,
    email: "",
    pass: "",
    moveScreen: false
  };

    login = async () => {
        try {
            let user = await auth.signInWithEmailAndPassword(
                "testtomych@user.com",
                "password"
            );
        } catch (error) {
            console.log(error);
        }
    };

  componentDidMount() {}

  render() {
      console.log('bla message',this.props.message);
      return (
      <View style={{ flex: 1, alignItems:'center', justifyContent:'center', backgroundColor: "lightgrey" }}>
          <Text>You are not logged in</Text>
          <Text>{this.props.message}</Text>
            {this.state.authStep === 0 ? (
                <View style={{marginVertical:20, flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => this.setState({authStep: 1})}>
                        <Text style={{fontWeight: 'bold', color: 'green'}}>Login</Text>
                    </TouchableOpacity>

                    <Text style={{marginHorizontal: 10}}>or</Text>

                    <TouchableOpacity onPress={() => this.setState({authStep: 2})}>
                        <Text style={{fontWeight: 'bold', color: 'blue'}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>) : (
                <View style={{marginVertical:20}}>
                    {this.state.authStep === 1 ? (
                        // login
                        <Text>Login</Text>
                    ) : (
                        // sighup
                        <Text>Sign Up</Text>
                    )}
                </View>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default UserAuth;
