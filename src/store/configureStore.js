import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import uiReducer from "./reducers/ui";
import authReducer from "./reducers/auth";
import RegistrationReducer from './reducers/registration';
import RegistrationHistoryReducer from './reducers/registrationHistory';
import EmploymentReducer from './reducers/employment';
import SpecialNeedReducer from './reducers/specialNeed';
import TracksReducer from './reducers/tracks';

const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  registrationData: RegistrationReducer,
  registrationHistoryData: RegistrationHistoryReducer,
  employmentData: EmploymentReducer,
  specialNeedData: SpecialNeedReducer,
  tracksData: TracksReducer,
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
