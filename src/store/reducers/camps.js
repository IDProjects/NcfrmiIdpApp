import {
    SET_CAMPS,
    REMOVE_CAMP,
    CAMP_ADDED,
    START_ADD_CAMP
  } from "../actions/actionTypes";

  const initialState = {
    camps: [],
    campAdded: false
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CAMPS:
        return {
          ...state,
          camps: action.camps
        };
      case REMOVE_CAMP:
        return {
          ...state,
          camps: state.camps.filter(camp => {
            return camp.key !== action.key;
          })
        };
      case START_ADD_CAMP:
        return {
          ...state,
          campAdded: false
        };
      case CAMP_ADDED:
        return {
          ...state,
          campAdded: true
        };
      default:
        return state;
    }
  };

  export default reducer;
