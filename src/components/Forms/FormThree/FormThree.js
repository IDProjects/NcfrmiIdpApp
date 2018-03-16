import React, { Component } from "react";
import {
    View,
	StyleSheet,
    Text
} from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import t from 'tcomb-form-native';
import MainText from "../../UI/MainText/MainText";
import HeadingText from "../../UI/HeadingText/HeadingText";
import { employmentUpdate } from "../../../store/actions/index";

const Form = t.form.Form;

let OcpLookUp = t.enums({
    Mechanic: 'Mechanic',
    Carpenter: 'Carpenter',
    Plumber: 'Plumber',
    Stylist: 'Stylist',
    Other: 'Other'
});

let PrtLookUp = t.enums({
    House: 'House',
    Cars: 'Cars',
    Shops: 'Shops',
});

let Tertia = t.enums({
    Ond: 'OND/NCE',
    Hnd: 'HND',
    Degree: 'Degree',
    Pgd: 'PGD',
    Masters: 'Masters',
    Phd: 'PHD'
});

let BasicEdu = t.enums({
    Ond: 'Primary',
    Hnd: 'Secondary'
});

const options = {
    fields: {
      isLiterate: {
        label: 'Are you literate?',
      },
      hasMissingDocs: {
        label: 'Missing documents?',
      },
      missingDocs: {
        label: 'Identify missing documents?',
      },
      isPropertyDamaged: {
          label: 'Property damaged?'
      }
    },
  };

class FormThree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.employmentData,
            employment: this.getEmployment({}, "no")
        };
    }

    getEmployment = (value, putit = "yes") => {
        let dp = {};
        let md = {};
        let hia = {};
        if (value.isPropertyDamaged || putit === "no" && this.props.employmentData.isPropertyDamaged) {
          dp = {
              damagedProperties: t.String,
          };
        }

        if (value.hasMissingDocs || putit === "no" && this.props.employmentData.hasMissingDocs) {
          md = {
              missingDocs: t.String,
          };
        }

        if (value.occupation && value.occupation == "Other" || putit === "no" && this.props.employmentData.occupation) {
          hia = {
              other: t.maybe(t.String),
          };
        }

        return t.struct({
            occupation: t.maybe(OcpLookUp),
            ...hia,
            hasMissingDocs: t.Boolean,
            ...md,
            skills: t.maybe(t.String),
            isPropertyDamaged: t.Boolean,
            ...dp,
            isLiterate: t.Boolean,
            basicEducation: t.maybe(BasicEdu),
            tertiaryEducation: t.maybe(Tertia),
        });
    }

    onChange = (value) => {
        const employment = value.isPropertyDamaged !== this.state.value.isPropertyDamaged || value.hasMissingDocs !== this.state.value.hasMissingDocs || value.occupation !== this.state.value.occupation ?
          this.getEmployment(value) :
          this.state.employment;
        this.setState({ value, employment });
        this.props.onEmploymentUpdate(value);
    };

    nextPreprocess = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        //console.log('value: ', value);

        //if (value) { // if validation fails, value will be null
          console.log(value); // value here is an instance of Person
          // Save step state for use in other steps of the wizard
          this.props.saveState(2, value);
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
            <View style={styles.container}>
                <View style={styles.subheadcontent}>
                  <Text style={styles.subheadtext}>Step Three - Employment/Education Background</Text>
                </View>

                <Form
                  ref={c => this._form = c}
                  type={this.state.employment}
                  value={this.state.value}
                  onChange={this.onChange}
                  options={options}
                />

                <View style={styles.nxtContainer}>
                    <Button
                    title="<<< Previous Step"
                    backgroundColor='#00a79d'
                    onPress={this.previousPreprocess}
                    />

                    <Button
                    title=">>> Next Step"
                    backgroundColor='#00a79d'
                    onPress={this.nextPreprocess}
                    />
                </View>

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
});

const mapStateToProps = state => {
  return {
    employmentData: state.employmentData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEmploymentUpdate: (data) => dispatch(employmentUpdate(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormThree);
