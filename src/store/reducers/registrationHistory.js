import {
    REGISTRATIONHISTORY_UPDATE,
    REGISTRATIONHISTORY_CREATE,
    REGISTRATIONHISTORY_SAVE_SUCCESS
} from "../actions/actionTypes";

const INITIAL_STATE = {
    registeredBy: null,
    registrationLocation: '',
    oldRegId: '',
    hadProtection: false,
    protectionLocation: '',
    protectionDate: null,
    hadAssistance: false,
    intending: false,
    intendingDate: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTRATIONHISTORY_UPDATE:
      //console.log('updvalue', action.payload);
      return { ...state, ...action.payload };
    case REGISTRATIONHISTORY_CREATE:
      return INITIAL_STATE;
    case REGISTRATIONHISTORY_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
