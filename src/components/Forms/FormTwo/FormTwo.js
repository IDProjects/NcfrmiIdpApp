import React, { Component } from "react";
import {
    View,
	StyleSheet,
    Text,
    ScrollView
} from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import t from 'tcomb-form-native';
import moment from 'moment';
import MainText from "../../UI/MainText/MainText";
import HeadingText from "../../UI/HeadingText/HeadingText";
import { registrationHistoryUpdate } from "../../../store/actions/index";

const Form = t.form.Form;

const LookUp = t.enums({
    Lookup1: 'Lookup1',
    Lookup2: 'Lookup2',
    Lookup3: 'Lookup3',
    Lookup4: 'Lookup4',
});

const IntendLookUp = t.enums({
    Lookup1: 'Return',
    Lookup2: 'Relocate',
    Lookup3: 'Integrate',
});

let myFormatFunction = (format,date) =>{
    return moment(date).format(format);
}

const options = {
    fields: {
        protectionDate: {
            mode:'date',
            config:{
                format:(date) => myFormatFunction("DD MMM YYYY",date)
            }
        },
        intendingDate: {
            mode:'date',
            config:{
                format:(date) => myFormatFunction("DD MMM YYYY",date)
            }
        },
        registeredBy: {
          help: 'Which agency registered the applicant'
        },
        registrationLocation: {
          help: 'What Camp was the applicant registered at?'
        },
        oldRegId: {
          label: 'Old registration number (Optional)'
        },
        hadProtection: {
          label: 'Has the applicant ever applied for protection with NCFRMI or any other agency?'
        },
        protectionLocation: {
          help: 'Where was the protection applied for?'
        },
        hadAssistance: {
          label: 'Was the the decision/assitance obtained?',
          help: 'Was the applicant granted protection?'
        },
        intending: {
          label: 'Are you intending to',
          help: 'Does the applicant want to return, relocate, or integrate to their home location?'
        },
    },
};

class FormTwo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.registrationHistoryData,
            registerationHistory: this.getRegistrationHistory({}, "no")
        };
    }

    getRegistrationHistory = (value, putit = "yes") => {
        let pld = {};
        let rd = {};

        if (value.hadProtection || putit === "no" && this.props.registrationHistoryData.hadProtection) {
          pld = {
              protectionLocation: t.maybe(t.String),
              protectionDate: t.maybe(t.Date),
          };
        }

        if (value.intending || putit === "no" && this.props.registrationHistoryData.intending) {
          rd = {
              intendingDate: t.Date,
          };
        }

        return t.struct({
            registeredBy: t.maybe(LookUp),
            registrationLocation: t.maybe(t.String),
            oldRegId: t.maybe(t.String),
            hadProtection: t.Boolean,
            ...pld,
            hadAssistance: t.Boolean,
            intending: t.maybe(IntendLookUp),
            ...rd
        });
    }

    onChange = (value) => {
        // recalculate the type only if strictly necessary
        const registerationHistory = value.hadProtection !== this.state.value.hadProtection || value.intending !== this.state.value.intending ?
          this.getRegistrationHistory(value) :
          this.state.registerationHistory;
        this.setState({ value, registerationHistory });
        this.props.onRegistrationHistoryUpdate(value);
    };

    nextPreprocess = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        //console.log('value: ', value);

        //if (value) { // if validation fails, value will be null
          console.log(value); // value here is an instance of Person
          // Save step state for use in other steps of the wizard
          this.props.saveState(1, value);
          // Go to next step
          this.props.nextFn();
        //}
    };

    previousPreprocess = () => {
        // Go to previous step
        this.props.prevFn();
    };

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container} >
                <View style={styles.subheadcontent}>
                  <Text style={styles.subheadtext}>Step Two - Registeration History</Text>
                </View>

                <Form
                  ref={c => this._form = c}
                  type={this.state.registerationHistory}
                  options={options}
                  value={this.state.value}
                  onChange={this.onChange}
                />

                <View style={styles.nxtContainer}>
                    <Button
                    title="<<< Previous Step "
                    backgroundColor='#00a79d'
                    onPress={this.previousPreprocess}
                    />

                    <Button
                    title=">>> Next Step "
                    backgroundColor='#00a79d'
                    onPress={this.nextPreprocess}
                    />
                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#eee',
    },
    subheadcontent: {
      justifyContent: 'center',
      alignItems: "center",
      marginBottom: 10,

    },
    subheadtext: {
        color: "grey",
        fontSize: 20
    },
    nxtContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
});

const mapStateToProps = state => {
  return {
    registrationHistoryData: state.registrationHistoryData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegistrationHistoryUpdate: (data) => dispatch(registrationHistoryUpdate(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormTwo);
