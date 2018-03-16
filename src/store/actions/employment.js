import {
    EMPLOYMENT_UPDATE,
    EMPLOYMENT_CREATE,
    EMPLOYMENT_SAVE_SUCCESS
} from "./actionTypes";

export const employmentUpdate = (value) => {
  return {
    type: EMPLOYMENT_UPDATE,
    payload: value
  };
};
