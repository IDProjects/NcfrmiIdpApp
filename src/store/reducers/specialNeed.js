import {
    SPECIALNEED_UPDATE,
    SPECIALNEED_CREATE,
    SPECIALNEED_SAVE_SUCCESS
} from "../actions/actionTypes";

const INITIAL_STATE = {
    prioritySkills: '',
    hasHealthProblems: false,
    healthProblems: '',
    hasIncedenceAttack: false,
    isPregnant: false,
    isNursingMother: false,
    isTreatedEqual: false,
    isDisable: false,
    isSeperatedChild: false,
    isUnaccompaniedElder: false,
    otherNeeds: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SPECIALNEED_UPDATE:
      //console.log('updvalue', action.payload);
      return { ...state, ...action.payload };
    case SPECIALNEED_CREATE:
      return INITIAL_STATE;
    case SPECIALNEED_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
