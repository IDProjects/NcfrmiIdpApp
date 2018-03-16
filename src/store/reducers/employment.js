import {
    EMPLOYMENT_UPDATE,
    EMPLOYMENT_CREATE,
    EMPLOYMENT_SAVE_SUCCESS
} from "../actions/actionTypes";

const INITIAL_STATE = {
    occupation: null,
    hasMissingDocs: false,
    missingDocs: '',
    skills: '',
    isPropertyDamaged: false,
    damagedProperties: '',
    basicEducation: '',
    tertiaryEducation: false,
    isLiterate: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYMENT_UPDATE:
      //console.log('updvalue', action.payload);
      return { ...state, ...action.payload };
    case EMPLOYMENT_CREATE:
      return INITIAL_STATE;
    case EMPLOYMENT_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
