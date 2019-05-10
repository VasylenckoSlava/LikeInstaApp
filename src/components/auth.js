import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
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

      var email = this.state.email;
      var pass = this.state.pass;

      if(email !== '' && pass !== ''){
        try {
          let user = await auth.signInWithEmailAndPassword(email, pass);
            } catch (error) {
            console.log(error);
           alert(error);
      }
      } else {
        alert('email or password is empty');
      }
    };

    createUserObj = (userObj, email) => {
      console.log(userObj, email, userObj.uid);
      var uObj = {
        name: 'Enter name',
        username: '@name',
        avatar:'http://www.gravatar.com/avatar',
        email: email
      }
      database.ref('users').child(userObj.uid).set(uObj);
    };

    signup = async () => {

      var email = this.state.email;
      var pass = this.state.pass;

      if(email !== '' && pass !== ''){
        try {
          let user = await auth.createUserWithEmailAndPassword(email, pass).then(
            (userObj) => this.createUserObj(userObj.user, email)
          ).catch((error) => alert(error));

            } catch (error) {
            console.log(error);
           alert(error);
      }
      } else {
        alert('email or password is empty');
      }
    };


  componentDidMount() {
      if(this.props.moveScreen === true){
         this.setState({
             moveScreen: true
         });
      }
  }

  showLogin = () => {
      if(this.state.moveScreen === true){
          this.props.navigation.navigate("Upload");
          return false;
      }
      this.setState({authStep: 1})
  };

  showSignUp = () => {
      if(this.state.moveScreen === true){
          this.props.navigation.navigate("Upload");
          return false;
      }
        this.setState({authStep: 2})
    };

  render() {
      console.log('bla message',this.props.message);
      return (
      <View style={{ flex: 1, alignItems:'center', justifyContent:'center', backgroundColor: "lightgrey" }}>
          <Text>You are not logged in</Text>
          <Text>{this.props.message}</Text>
            {this.state.authStep === 0 ? (
                <View style={{marginVertical:20, flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => this.showLogin()}>
                        <Text style={{fontWeight: 'bold', color: 'green'}}>Login</Text>
                    </TouchableOpacity>

                    <Text style={{marginHorizontal: 10}}>or</Text>

                    <TouchableOpacity onPress={() => this.showSignUp()}>
                        <Text style={{fontWeight: 'bold', color: 'blue'}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>) : (
                <View style={{marginVertical:20}}>
                    {this.state.authStep === 1 ? (
                        // login
                        <View>
                          <TouchableOpacity
                            onPress={() => this.setState({authStep: 0})}
                            style={{borderBottomWidth:1, paddingVertical: 5, marginBottom:10, borderBottomColor: 'red'}}
                          >
                            <Text style={{fontWeight: 'bold'}}>Cancel</Text>
                          </TouchableOpacity>
                          <Text style={{fontWeight: 'bold',marginBottom: 20}}>Login</Text>
                            <Text>Email Address:</Text>
                            <TextInput
                              editable
                              keyboardType={'email-address'}
                              placeholder={'enter your email address..'}
                              onChangeText={(text) =>this.setState({email: text})}
                              value={this.state.email}
                              style={{width: 250, marginVertical: 10, padding:5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
                            />
                            <Text>Password:</Text>
                            <TextInput
                                editable
                                keyboardType={'email-address'}
                                secureTextEntry
                                placeholder={'enter your email password..'}
                                onChangeText={(text) =>this.setState({pass: text})}
                                value={this.state.pass}
                                style={{width: 250, marginVertical: 10, padding:5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
                            />
                            <TouchableOpacity
                              onPress={() => this.login()}
                              style={{backgroundColor:'green', paddingVertical:10, paddingHorizontal:20, borderRadius: 5}}
                            >
                              <Text style={{color:'white'}}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        // sighup
                        <View>
                          <TouchableOpacity
                            onPress={() => this.setState({authStep: 0})}
                            style={{borderBottomWidth:1, paddingVertical: 5, marginBottom:10, borderBottomColor: 'red'}}
                          >
                            <Text style={{fontWeight: 'bold'}}>Cancel</Text>
                          </TouchableOpacity>
                          <Text style={{fontWeight: 'bold',marginBottom: 20}}>Sign Up</Text>
                            <Text>Email Address:</Text>
                            <TextInput
                              editable
                              keyboardType={'email-address'}
                              placeholder={'enter your email address..'}
                              onChangeText={(text) =>this.setState({email: text})}
                              value={this.state.email}
                              style={{width: 250, marginVertical: 10, padding:5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
                            />
                            <Text>Password:</Text>
                            <TextInput
                                editable
                                keyboardType={'email-address'}
                                secureTextEntry
                                placeholder={'enter your email password..'}
                                onChangeText={(text) =>this.setState({pass: text})}
                                value={this.state.pass}
                                style={{width: 250, marginVertical: 10, padding:5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
                            />
                            <TouchableOpacity
                              onPress={() => this.signup()}
                              style={{backgroundColor:'blue', paddingVertical:10, paddingHorizontal:20, borderRadius: 5}}
                            >
                              <Text style={{color:'white'}}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
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
