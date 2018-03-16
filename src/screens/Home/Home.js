import React, { Component } from "react";
import {
    View,
	StyleSheet,
    Text,
    ScrollView
} from "react-native";
import { Button, Card } from 'react-native-elements';
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import regThumb from "../../assets/b1.jpg";
import reg2Thumb from "../../assets/b2.jpg";
import reg3Thumb from "../../assets/b3.jpg";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";

class HomeScreen extends Component {
 
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
          if (event.id === "sideDrawerToggle") {
            this.props.navigator.toggleDrawer({
              side: "left"
            });
          }
        }
    };

    switchToRegister = () => {
        this.props.navigator.switchToTab({ tabIndex: 1 });
    };

    componentWillMount(){
        if (this.props.tracksData && this.props.tracksData.familyCount > 0) {
            this.switchToRegister();
        }
    }

    render() {
        return (
            <ScrollView>
                <Card>
                    <Button
                    large
                    icon={{name: 'people'}}
                    onPress={() => this.switchToRegister()}
                    backgroundColor='#00a79d'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='REGISTER IDPs' />
                </Card>

                <Card>
                    <Button
                    large
                    icon={{name: 'visibility'}}
                    onPress={() => alert('Verify IDP')}
                    backgroundColor='#00a79d'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='VERIFY' />
                </Card>

                <Card>
                    <Button
                    large
                    icon={{name: 'pageview'}}
                    onPress={() => alert('Identify IDP')}
                    backgroundColor='#00a79d'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='IDENTIFY' />
                </Card>

            </ScrollView>
        );
    }

}

var styles = StyleSheet.create({
    buttoncontainer: {
        marginTop: 30
    }
});

const mapStateToProps = state => {
  return {
    tracksData: state.tracksData
  };
};

export default connect(mapStateToProps)(HomeScreen);
