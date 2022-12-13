import { createReducer, createActions } from "reduxsauce";

const initialState = {
  forceLogout: false,
  deviceType: "",
  projectName: "",
};

export const { Types: AuthTypes, Creators: AuthActions } = createActions({
  setForceLogout: ["forceLogout"],
  setDeviceType: ["deviceType"],
  setProjectName: ["projectName"],
});
export const AuthSelectors = {
  forceLogout: (state) => state.auth.forceLogout,
  deviceType: (state) => state.auth.deviceType,
  projectName: (state) => state.auth.projectName,
};

const setForceLogout = (state = initialState, { forceLogout }) => {
  return {
    ...state,
    forceLogout: forceLogout,
  };
};

const setDeviceType = (state = initialState, { deviceType }) => {
  return {
    ...state,
    deviceType: deviceType,
  };
};
const setProjectName = (state = initialState, { projectName }) => {
  return {
    ...state,
    projectName: projectName,
  };
};

export const HANDLERS = {
  [AuthTypes.SET_FORCE_LOGOUT]: setForceLogout,
  [AuthTypes.SET_DEVICE_TYPE]: setDeviceType,
  [AuthTypes.SET_PROJECT_NAME]: setProjectName,
};

export default createReducer(initialState, HANDLERS);
