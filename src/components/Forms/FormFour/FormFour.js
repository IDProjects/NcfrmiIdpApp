import React, { Component } from "react";
import {
    View,
	StyleSheet,
    Text,
    ActivityIndicator,
    FlatList,
    NativeModules
} from "react-native";
import { connect } from "react-redux";
import { Button, CheckBox } from "react-native-elements";
import t from 'tcomb-form-native';
import MainText from "../../UI/MainText/MainText";
import HeadingText from "../../UI/HeadingText/HeadingText";
import { specialNeedUpdate } from "../../../store/actions/index";
import { startPrinterModals } from "../../../screens/MainModals/startMainModals";

const Form = t.form.Form;
const items = ['Food', 'Non-food Items', 'Health', 'W.A.S.H', 'Education', 'SGB'];

let IncedAttack = t.enums({
    Rape: 'Rape',
    Kidnapping: 'Kidnapping',
    ForcedMarriage: 'Forced Marriage',
    Other: 'Other'
});

const options = {
    fields: {
        hasHealthProblems: {
            label: 'Any health issues/problems?',
        },
      hasIncedenceAttack: {
          label: 'Any incidence of physical attack or violence on the individual or a family member?',
      },
      isPregnant: {
        label: 'Are you pregnant?',
      },
      isNursingMother: {
        label: 'Are you nursing mother?',
      },
      isTreatedEqual: {
        label: 'Have you faced any gender discrimination?',
        help: 'Has the applicant received unequal treatment different from their  male counterparts?'
      },
      isDisable: {
        label: 'Are you disable?',
      },
      isSeperatedChild: {
        label: 'Are you an accompanied child?',
        help: 'Is the child alone? Or without a parent or a guardian?'
      },
      isUnaccompaniedElder: {
        label: 'Are you an accompanied Elder?',
      },
      other: {
        label: 'Other (Specify)',
      },
      otherNeeds: {
        label: 'Specify additional needs if any',
      }
    },
  };

class FormFour extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.specialNeedData,
            specialNeed: this.getSpecialNeed({}, "no"),
            checked: []
        };
    }

    getSpecialNeed = (value, putit = "yes") => {
        let hp = {};
        let hia = {};
        let preg = {};

        if (value.hasHealthProblems || putit === "no" && this.props.specialNeedData.hasHealthProblems) {
          hp = {
              healthProblems: t.maybe(t.String),
          };
        }

        if (value.hasIncedenceAttack && value.hasIncedenceAttack == "Other" || putit === "no" && this.props.specialNeedData.hasIncedenceAttack) {
          hia = {
              other: t.maybe(t.String),
          };
        }

        if (putit === "no" && this.props.sex === "F") {
          preg = {
              isPregnant: t.Boolean,
              isNursingMother: t.Boolean,
          };
        }

        return t.struct({
            prioritySkills: t.String,
            hasHealthProblems: t.Boolean,
            ...hp,
            hasIncedenceAttack: t.maybe(IncedAttack),
            ...hia,
            ...preg,
            isTreatedEqual: t.Boolean,
            isDisable: t.Boolean,
            isSeperatedChild: t.Boolean,
            isUnaccompaniedElder: t.Boolean,
            otherNeeds: t.maybe(t.String)
        });
    }

    onChange = (value) => {
        // recalculate the type only if strictly necessary
        const specialNeed = value.hasHealthProblems !== this.state.value.hasHealthProblems || value.hasIncedenceAttack !== this.state.value.hasIncedenceAttack ?
          this.getSpecialNeed(value) :
          this.state.specialNeed;
        this.setState({ value, specialNeed });
        this.props.onSpecialNeedUpdate(value);
    };

    checkItem = item => {
        const { checked } = this.state;
        //console.log(item, 'Item nya');
        if (!checked.includes(item)) {
          this.setState({ checked: [...checked, item] });
        } else {
          this.setState({ checked: checked.filter(a => a !== item) });
        }
      };

    nextPreprocess = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        //console.log('value: ', value);

        //if (value) { // if validation fails, value will be null
          console.log(value); // value here is an instance of Person
          // Save step state for use in other steps of the wizard
          this.props.saveState(3, value); 
          // Go to next step
          this.props.nextFn();
        //}
    };

    previousPreprocess = () => {
        // Go to previous step
        this.props.prevFn();
    };

    switchToPrinter = () => {
        startPrinterModals();
    };

    switchToFinger = () => {
      NativeModules.BIOCapture.CaptureFinger
      (  
        (error) => 
        {
        console.log(error); // we can give a message to retry scanning here if error is 'Failed'
        },
        (imageString) => 
        {
        console.log(imageString); //we can manipulate the imageString here;
        }
      );
    };

    render() {
        let submitButton = (
            <View style={styles.nxtContainer}>
                <Button
                title="<<< Previous Step"
                backgroundColor='#00a79d'
                onPress={this.previousPreprocess}
                />
                <Button
                    title="Submit Form"
                    backgroundColor='#00a79d'
                    onPress={this.nextPreprocess}
                />
            </View>
        );

        if (this.props.isLoading) {
          submitButton = (
              <View style={styles.nxtContainer}>
                  <ActivityIndicator />
              </View>
          );
        }
        return (
            <View style={styles.container}>
                <View style={styles.subheadcontent}>
                  <Text style={styles.subheadtext}>Step Four - Special Need</Text>
                </View>

                <View>
                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>Priority needs</Text>
                    <FlatList
                      data={items}
                      extraData={this.state}
                      renderItem={({ item }) => (
                        <CheckBox
                          title={item}
                          onPress={() => this.checkItem(item)}
                          checked={this.state.checked.includes(item)}
                        />
                      )}
                      keyExtractor={(item, index) => index}
                    />
                  </View>

                <Form
                  ref={c => this._form = c}
                  type={this.state.specialNeed}
                  options={options}
                  value={this.state.value}
                  onChange={this.onChange}
                />

                <View style={styles.button}>
                  <Button icon={{name: 'camera'}} title="Finger Print Capture" onPress={this.switchToFinger} backgroundColor='#00a79d' />
                </View>

                    {submitButton}

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
    nxtContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
      margin: 11
    },
});

const mapStateToProps = state => {
  return {
    specialNeedData: state.specialNeedData,
    sex: state.registrationData.sex,
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSpecialNeedUpdate: (data) => dispatch(specialNeedUpdate(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormFour);
