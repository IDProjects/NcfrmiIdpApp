import {
    REGISTRATION_UPDATE,
    REGISTRATION_CREATE,
    REGISTRATION_SAVE_SUCCESS
} from "./actionTypes";

export const registrationUpdate = (value) => {
  return {
    type: REGISTRATION_UPDATE,
    payload: value
  };
};
