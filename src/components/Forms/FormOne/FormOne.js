import React, { Component } from "react";
import {
  View,
	StyleSheet,
  Text
} from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import t from 'tcomb-form-native';
import moment from 'moment';
import PickImage from "../../PickImage/PickImage";
import MainText from "../../UI/MainText/MainText";
import HeadingText from "../../UI/HeadingText/HeadingText";
import generateLga from "../../../utility/generateLga";
import { registrationUpdate, setFamilyCount } from "../../../store/actions/index";

const Form = t.form.Form;

let Gender = t.enums({
  M: 'Male',
  F: 'Female'
});

let Marital = t.enums({
  Single: 'Single',
  Married: 'Married',
  Divorced: 'Divorced',
  Separated: 'Separated'
});

let Relate = t.enums({
  Father: 'Father',
  Mother: 'Mother',
  Brother: 'Brother',
  Sister: 'Sister',
});

let State = t.enums(
    require("../../../utility/states/states.json")
);

let Camp = t.enums({
  Camp1: 'Camp1',
  Camp2: 'Camp2',
  Camp3: 'Camp3',
  Camp4: 'Camp4',
});

let Religion = t.enums({
  Islam: 'Islam',
  Christian: 'Christian',
  Budhist: 'Budhist',
  Tradition: 'Tradition'
});

let Nations = t.enums({
  Nigeria: 'Nigeria',
});

let myFormatFunction = (format,date) =>{
  return moment(date).format(format);
}

const options = {
  fields: {
    firstName: {
        error: 'First name is required for this data'
    },
    surname: {
        error: 'Enter your surname'
    },
    lga: {
        label: 'LGA',
    },
    isPrincipalApplicant: {
      label: 'Are you the principal applicant?',
      help: 'Is the applicant the head of the family/household?'
    },
    familySize: {
      label: 'Size of family?',
      help: 'The applicant should be asked how many dependants he/she has at the camp?'
    },
    campId: {
      label: 'Select Camp',
    },
    pastAddress: {
        label: 'Previous address'
    },
    registrationDate: {
      label: 'Registration date',
      mode:'date',
      config:{
          format:(date) => myFormatFunction("DD MMM YYYY",date)
      }
    },
    dateOfDisplacement: {
      mode:'date',
      config:{
          format:(date) => myFormatFunction("DD MMM YYYY",date)
      }
    },
    dateOfBirth: {
      mode:'date',
      config:{
          format:(date) => myFormatFunction("DD MMM YYYY",date)
      }
    },
    campId: {
        nullOption: {value: '', text: 'Choose a camp'}
    }
  },
};

class FormOne extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.registrationData,
            registeration: this.getRegistration({}, "no")
        };
    }

    getRegistration = (value, putit = "yes") => {
        let fam = {};
        let rela = {};
        let LGAc = t.enums({});
        let mart = {};
        let ipa = {};
        if (value.isPrincipalApplicant || putit === "no" && this.props.registrationData.isPrincipalApplicant) {
          fam = {
              familySize: t.maybe(t.Number),
          };
        }

        if (value.stateOfOrigin || putit === "no" && this.props.registrationData.stateOfOrigin) {
            let replaced = value.stateOfOrigin;

            LGAc = t.enums(
                generateLga(replaced)
            );
        }

        if (value.maritalStatus == "Married" || putit === "no" && this.props.registrationData.maritalStatus) {
          mart = {
              spouseName: t.maybe(t.String),
          };
        }

        if (this.props.tracksData && this.props.tracksData.currentCount > 0) {
            rela = {
                relationship: t.maybe(Relate),
            };
        }

        if (this.props.tracksData && this.props.tracksData.currentCount == 0) {
            ipa = {
                isPrincipalApplicant: t.Boolean,
            };
        }

        return t.struct({
          campId: Camp,
          registrationDate: t.Date,
          ...ipa,
          ...fam,
          causeOfDisplacement: t.String,
          dateOfDisplacement: t.Date,
          surname: t.String,
          firstName: t.String,
          middleName: t.maybe(t.String),
          pastAddress: t.maybe(t.String),
          presentAddress: t.String,
          phoneNumber: t.maybe(t.Number),
          email: t.maybe(t.String),
          sex: Gender,
          dateOfBirth: t.Date,
          placeOfBirth: t.String,
          stateOfOrigin: State,
          lga: t.maybe(LGAc),
          town: t.maybe(t.String),
          village: t.maybe(t.String),
          ethnicity: t.String,
          religion: Religion,
          nationality: Nations,
          languagesSpoken: t.String,
          prefferdLanguage: t.maybe(t.String),
          maritalStatus: Marital,
          ...mart,
          fatherName: t.String,
          motherName: t.String,
          ...rela
        });
    };

    onChange = (value) => {
        // recalculate the type only if strictly necessary
        const registeration = value.isPrincipalApplicant !== this.state.value.isPrincipalApplicant || value.stateOfOrigin !== this.state.value.stateOfOrigin || value.maritalStatus !== this.state.value.maritalStatus ?
          this.getRegistration(value) :
          this.state.registeration;
        this.setState({ value, registeration });
        this.props.onRegistrationUpdate(value);
        if (value.familySize !== this.state.value.familySize) {
            //alert(value.familySize);
            this.props.onSetFamilyCount(value.familySize);
        }
    };

    nextPreprocess = () => {
        const value = this._form.getValue(); // use that ref to get the form value

        //if (value) { // if validation fails, value will be null
          console.log('value: ', value); // value here is an instance of Person
          // Save step state for use in other steps of the wizard
          this.props.saveState(0, value);
          // Go to next step
          this.props.nextFn();
        //}
    };

    previousPreprocess = () => {
        // Go to previous step
        this.props.prevFn()
    };

    imagePickedHandler = image => {

    };

    render() {
        let content = null;
        if (this.props.tracksData && this.props.tracksData.currentCount > 0) {
            const currentCount = this.props.tracksData.currentCount;
            const familyCount = this.props.tracksData.familyCount;
            content = (
                <Text style={styles.subheadtext}> Dependants - {currentCount} of {familyCount}</Text>
            );
        }
        return (
            <View style={styles.container}>
                <View style={styles.subheadcontent}>
                  <Text style={styles.subheadtext}>Step One - Registeration</Text>
                  { content }
                </View>
                <PickImage
                  onImagePicked={this.imagePickedHandler}
                  ref={ref => (this.imagePicker = ref)}
                />
                <Form
                  ref={c => this._form = c}
                  type={this.state.registeration}
                  options={options}
                  value={this.state.value}
                  onChange={this.onChange}
                />

                <Button
                  title=">>> Next Step"
                  backgroundColor='#00a79d'
                  onPress={this.nextPreprocess}
                />
            </View>
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
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

const mapStateToProps = state => {
  return {
    registrationData: state.registrationData,
    tracksData: state.tracksData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegistrationUpdate: (data) => dispatch(registrationUpdate(data)),
    onSetFamilyCount: (value) => dispatch(setFamilyCount(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormOne);
