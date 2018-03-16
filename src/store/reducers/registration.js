import {
    REGISTRATION_UPDATE,
    REGISTRATION_CREATE,
    REGISTRATION_SAVE_SUCCESS
} from "../actions/actionTypes";

const INITIAL_STATE = {
    campId: null,
    registrationDate: null,
    isPrincipalApplicant: false,
    familySize: null,
    causeOfDisplacement: '',
    dateOfDisplacement: null,
    surname: '',
    firstName: '',
    middleName: '',
    pastAddress: '',
    presentAddress: '',
    phoneNumber: '',
    email: '',
    sex: null,
    dateOfBirth: null,
    placeOfBirth: '',
    stateOfOrigin: null,
    lga: null,
    town: '',
    village: '',
    ethnicity: '',
    religion: '',
    nationality: '',
    languagesSpoken: '',
    prefferdLanguage: '',
    maritalStatus: '',
    fatherName: '',
    motherName: '',
    spouseName: '',
    relationship: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTRATION_UPDATE:
      return { ...state, ...action.payload };
    case REGISTRATION_CREATE:
      if (action.tracks && action.tracks.currentCount > action.tracks.familyCount) {
          return INITIAL_STATE;
      } else {
          return {
              ...state,
              isPrincipalApplicant: false,
              familySize: null,
              firstName: '',
              middleName: '',
              dateOfBirth: null,
              maritalStatus: '',
              spouseName: ''
          };
      }

    case REGISTRATION_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
