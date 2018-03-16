import {
  REGISTRATION_CREATE,
  REGISTRATIONHISTORY_CREATE,
  EMPLOYMENT_CREATE,
  SPECIALNEED_CREATE,
  SET_FAMILYCOUNT,
  SET_CURRENTCOUNT
} from "./actionTypes";
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";
import startMainTabs from "../../screens/MainTabs/startMainTabs";

export const addSubmission = (registration, registrationHistory, employment, specialNeed, tracks) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(token => {
        authToken = token;
        return fetch(
          "https://ncfrmi-e75f9.firebaseio.com/registration.json?auth=" +
            authToken,
          {
            method: "POST",
            body: JSON.stringify(registration)
          }
        );
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        console.log('Final', parsedRes.name);
        fetch(
          "https://ncfrmi-e75f9.firebaseio.com/registrationHistory.json?auth=" +
            authToken,
          {
            method: "POST",
            body: JSON.stringify({...registrationHistory, registrationId: parsedRes.name})
          }
        );
        fetch(
          "https://ncfrmi-e75f9.firebaseio.com/employment.json?auth=" +
            authToken,
          {
            method: "POST",
            body: JSON.stringify({...employment, registrationId: parsedRes.name})
          }
        );
        fetch(
          "https://ncfrmi-e75f9.firebaseio.com/specialNeed.json?auth=" +
            authToken,
          {
            method: "POST",
            body: JSON.stringify({...specialNeed, registrationId: parsedRes.name})
          }
        );
        if (tracks && tracks.familyCount > 0) {
            dispatch({type: SET_CURRENTCOUNT, currentCount: ++tracks.currentCount });
            if (tracks && tracks.currentCount > tracks.familyCount) {
                dispatch({type: SET_FAMILYCOUNT, familyCount: 0 });
                dispatch({type: SET_CURRENTCOUNT, currentCount: 0 });
                dispatch({type: REGISTRATIONHISTORY_CREATE});
                dispatch({type: EMPLOYMENT_CREATE});
                dispatch({type: SPECIALNEED_CREATE});
            }
        }
        dispatch({type: REGISTRATION_CREATE, tracks: tracks});
        dispatch(uiStopLoading());
        startMainTabs();
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong, please try again!");
        dispatch(uiStopLoading());
      });
  };
};
