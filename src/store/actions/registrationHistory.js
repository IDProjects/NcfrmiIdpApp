import {
    REGISTRATIONHISTORY_UPDATE,
    REGISTRATIONHISTORY_CREATE,
    REGISTRATIONHISTORY_SAVE_SUCCESS
} from "./actionTypes";

export const registrationHistoryUpdate = (value) => {
  return {
    type: REGISTRATIONHISTORY_UPDATE,
    payload: value
  };
};
