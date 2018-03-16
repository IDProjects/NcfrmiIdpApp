import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import ImagePicker from "react-native-image-picker";
import picky from "../../assets/cm1.png";

class PickImage extends Component {
  state = {
    pickedImage: picky
  }

  reset = () => {
    this.setState({
      pickedImage: picky
    });
  }

  pickImageHandler = () => {
    ImagePicker.showImagePicker({title: "Capture Photo", maxWidth: 800, maxHeight: 600}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri }
        });
        this.props.onImagePicked({uri: res.uri, base64: res.data});
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button icon={{name: 'camera'}} title="Capture Photo" onPress={this.pickImageHandler} backgroundColor='#00a79d' />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    placeholder: {
      borderWidth: 1,
      borderColor: "#00a79d",
      backgroundColor: "#eee",
      width: "80%",
      height: 150
    },
    button: {
      margin: 8
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
  });

export default PickImage;
