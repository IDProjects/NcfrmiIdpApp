import {
    SET_FAMILYCOUNT,
    SET_CURRENTCOUNT
} from "./actionTypes";
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";

export const setFamilyCount = (familyCount) => {
    return {
        type: SET_FAMILYCOUNT,
        familyCount 
    }
};

export const setCurrentCount = (currentCount) => {
    return {
      type: SET_CURRENTCOUNT,
      currentCount
    };
};
