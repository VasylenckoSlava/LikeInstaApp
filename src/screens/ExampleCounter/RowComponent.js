import React, { PureComponent } from "react";
import {
  Text,
  View,
  StyleSheet,
  Switch,
  TouchableOpacity,
  TextInput
} from "react-native";

class RowComponent extends PureComponent {
  render() {
    const {
      complete,
      onComplete,
      text,
      onRemove,
      onToggleEditing
    } = this.props;
    const textComponent = (
      <TouchableOpacity
        style={styles.textWrapStyle}
        onLongPress={() => onToggleEditing(true)}
      >
        <Text style={[styles.text, complete && styles.complete]}> {text} </Text>
      </TouchableOpacity>
    );

    const removeButton = (
      <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
        <Text style={styles.destroy}>X</Text>
      </TouchableOpacity>
    );

    const doneButton = (
      <TouchableOpacity
        onPress={() => onToggleEditing(false)}
        style={styles.done}
      >
        <Text  style={styles.doneText}>Save</Text>
      </TouchableOpacity>
    );

    const editingComponent = (
      <View style={styles.textWrapStyle}>
        <TextInput
          onChangeText={this.props.onUpdate}
          value={this.props.text}
          autoFocus
          multiline
          style={styles.input}
        />
      </View>
    );
    return (
      <View style={styles.container}>
        <Switch value={complete} onValueChange={onComplete} />
        {this.props.editing ? editingComponent : textComponent}
        {this.props.editing ? doneButton : removeButton}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  textWrapStyle: {
    flex: 1,
    marginHorizontal: 10
  },
  text: {
    fontSize: 24,
    color: "#4d4d4d"
  },
  done: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#7be290",
    padding: 7
  },
  doneText: {
    color: "#4d4d4d",
    fontSize: 20
  },
  complete: {
    textDecorationLine: "line-through"
  },
  destroy: {
    fontSize: 20,
    color: "#cc9a9a"
  },
  deleteButton: {
    marginHorizontal: 15
  },
  input: {
    height: 100,
    flex: 1,
    fontSize: 24,
    padding: 0,
    color: "#4d4d4d"
  }
});

export default RowComponent;
