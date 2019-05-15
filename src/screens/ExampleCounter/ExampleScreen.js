import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ListView,
  Keyboard,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import Footer from "./Footer";
import Header from "./Header";
import RowComponent from "./RowComponent";
import { DrawerItems } from "react-navigation";
import { isTSTypeElement } from "@babel/types";

const filterItems = (filter, items) => {
  return items.filter(item => {
    if (filter === "ALL") return true;
    if (filter === "COMPLETED") return item.complete;
    if (filter === "ACTIVE") return !item.complete;
  });
};

class ExampleScreen extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      value: "",
      items: [],
      allComplete: false,
      dataSource: ds.cloneWithRows([]),
      filter: "ALL",
      loading: true
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("items").then(json => {
      try {
        const items = JSON.parse(json);
        this.setSource(items, items, { loading: false });
      } catch (e) {
        this.setState({
          loading: false
        });
      }
    });
  }

  handleClearComplete = () => {
    const newItems = filterItems("ACTIVE", this.state.items);
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  };

  handleFilter = filter => {
    this.setSource(this.state.items, filterItems(filter, this.state.items), {
      filter
    });
  };

  handleRemoveItem = key => {
    const newItems = this.state.items.filter(item => {
      return item.key !== key;
    });
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  };

  handleToggleComplete = (key, complete) => {
    const newItems = this.state.items.map(item => {
      if (item.key !== key) {
        return item;
      }
      return {
        ...item,
        complete
      };
    });
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  };

  handleUpdateText = (key, text) => {
    const newItems = this.state.items.map(item => {
      if (item.key !== key) return key;
      return {
        ...item,
        text
      };
    });
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  };

  handleToggleEditing = (key, editing) => {
    const newItems = this.state.items.map(item => {
      if (item.key !== key) return key;
      return {
        ...item,
        editing
      };
    });
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  };
  setSource = (items, itemsDatasource, otherState = {}) => {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
      ...otherState
    });
    AsyncStorage.setItem("items", JSON.stringify(items));
  };

  handleAddItem = () => {
    if (!this.state.value) return;
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ];
    this.setSource(newItems, filterItems(this.state.filter, newItems), {
      value: ""
    });
  };

  handleToggleAllComplete = () => {
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map(item => ({
      ...item,
      complete
    }));
    this.setSource(newItems, filterItems(this.state.filter, newItems), {
      allComplete: complete
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={value => this.setState({ value })}
          onToggleAllComplete={this.handleToggleAllComplete}
        />

        <View style={styles.content}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={({ key, ...value }) => {
              return (
                <RowComponent
                  key={key}
                  onUpdate={text => this.handleUpdateText(key, text)}
                  onToggleEditing={editing =>
                    this.handleToggleEditing(key, editing)
                  }
                  onComplete={complete =>
                    this.handleToggleComplete(key, complete)
                  }
                  onRemove={() => this.handleRemoveItem(key)}
                  {...value}
                />
              );
            }}
            renderSeparator={(sectioId, rowId) => {
              return <View key={rowId} style={styles.separator} />;
            }}
          />
        </View>

        <Footer
          count={filterItems("ACTIVE", this.state.items).length}
          filter={this.state.filter}
          onFilter={this.handleFilter}
          onClearComplete={this.handleClearComplete}
        />
        {this.state.loading && (
          <View style={styles.loading}>
            <ActivityIndicator animating size="large" />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 30
  },
  content: {
    flex: 1
  },
  list: {
    backgroundColor: "white"
  },
  separator: {
    borderWidth: 1,
    borderColor: "#F5F5F5"
  },
  loading: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.2)"
  }
});

export default ExampleScreen;

// function ExampleScreen() {
//   const [count, setCount] = useState(0);
//   useEffect(() => {
//     console.log(`You pressed ${count} times`);
//   });
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>You clicked {count} times:</Text>
//       <Button onPress={() => setCount(count + 1)} title="Click me" />
//     </View>
//   );
// }
