import {
    SPECIALNEED_UPDATE,
    SPECIALNEED_CREATE,
    SPECIALNEED_SAVE_SUCCESS
} from "./actionTypes";

export const specialNeedUpdate = (value) => {
  return {
    type: SPECIALNEED_UPDATE,
    payload: value
  };
};
