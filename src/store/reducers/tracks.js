import {
    SET_FAMILYCOUNT,
    SET_CURRENTCOUNT
  } from "../actions/actionTypes";

const INITIAL_STATE = {
    familyCount: 0,
    currentCount: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_FAMILYCOUNT:
          console.log('Fam Cnt', action.familyCount);
          return {
            ...state,
            familyCount: action.familyCount
          };
         case SET_CURRENTCOUNT:
            return {
              ...state,
              currentCount: action.currentCount
            };
       default:
         return state;
    }
};
