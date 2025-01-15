
import { store } from "../../app/store";
import axiosInstance from "../axios";

export const addAppointment = (appointmentData) => {
  const state = store.getState();
  if (state.authData.allUserData.banned) {
    return false;
  } else {
    return axiosInstance.post('/add/addAppointment', appointmentData);
  }
}