import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";

class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={this.props.onToggleAllComplete}>
          <Text style={styles.toggleIcon}>{String.fromCharCode(10003)}</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="What needs to be done?"
          onChangeText={this.props.onChange}
          onSubmitEditing={this.props.onAddItem}
          value={this.props.value}
          blurOnSubmit={false}
          returnKeyType="done"
          style={styles.input}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  toggleIcon: {
    fontSize: 30,
    color: "#CCC"
  },
  input: {
    flex: 1,
    marginLeft: 16,
    height: 50
  }
});

export default Header;
