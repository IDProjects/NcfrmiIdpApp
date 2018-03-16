import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

import { authLogout } from "../../store/actions/index";

class SideDrawer extends Component {
  render() {
    return (
        <View
          style={[
            styles.container,
            { width: Dimensions.get("window").width * 0.8 }
          ]}
        >
          <View style={styles.drawerHeader}>
              <Icon
                name={Platform.OS === "android" ? "md-person" : "ios-person"}
                size={30}
                style={styles.drawerHeaderIcon}
              />
              <Text style={styles.text}>Ahmed Ebuka</Text>
          </View>
          <TouchableOpacity onPress={this.props.onLogout}>
            <View style={styles.drawerItem}>
              <Icon
                name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
                size={30}
                color="#aaa"
                style={styles.drawerItemIcon}
              />
              <Text>Sign Out</Text>
            </View>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee"
  },
  drawerItemIcon: {
    marginRight: 20
  },
  drawerHeaderIcon: {
    marginRight: 20,
    backgroundColor:"#fff",
    borderWidth:1,
    padding:3,
    paddingLeft:7,
    paddingRight:7,
    borderColor:"#CCC",
    borderRadius:360
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingLeft: 16,
    paddingTop: 24,
    paddingBottom: 24,
    marginBottom: 10,
    backgroundColor: "#00a79d"
  },
  text: {
	color: "white",
    fontSize: 17,
    fontWeight: 'bold'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(authLogout())
  };
};

export default connect(null, mapDispatchToProps)(SideDrawer);
