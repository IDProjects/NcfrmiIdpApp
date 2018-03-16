import React, { Component } from "react";
import {
    View,
	StyleSheet,
    Text
} from "react-native";
import { connect } from "react-redux";
import MultiStep from 'react-native-multistep-wizard';
import FormOne from "../../components/Forms/FormOne/FormOne";
import FormTwo from "../../components/Forms/FormTwo/FormTwo";
import FormThree from "../../components/Forms/FormThree/FormThree";
import FormFour from "../../components/Forms/FormFour/FormFour";
import { addSubmission } from "../../store/actions/index";

const steps = [
  {name: 'FormOne', component: <FormOne/>},
  {name: 'FormTwo', component: <FormTwo/>},
  {name: 'FormThree', component: <FormThree/>},
  {name: 'FormFour', component: <FormFour/>},
];

class RegisterIdpScreen extends Component {

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

    finish = wizardState => {
        //code to be executed when wizard is finished
        //alert('Final!');
        this.props.onAddSubmission(this.props.registrationData, this.props.registrationHistoryData, this.props.employmentData, this.props.specialNeedData, this.props.tracksData);
    };

    render() {
        return (
            <View style={styles.stContainer}>
                <MultiStep steps={steps} onFinish={this.finish}/>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    buttoncontainer: {
        marginTop: 30
    },
    stContainer: {
      backgroundColor: '#eee',
    },
});

const mapStateToProps = state => {
  return {
    registrationData: state.registrationData,
    registrationHistoryData: state.registrationHistoryData,
    employmentData: state.employmentData,
    specialNeedData: state.specialNeedData,
    tracksData: state.tracksData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddSubmission: (registrationData, registrationHistoryData, employmentData, specialNeedData, tracksData) => dispatch(addSubmission(registrationData, registrationHistoryData, employmentData, specialNeedData, tracksData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterIdpScreen);
