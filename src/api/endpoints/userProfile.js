import axiosInstance from "../axios";
import { store } from '../../app/store';

export const getUserAppointments = (page, limit) => {
  const state = store.getState();
  const patient_id = state.authData?.userId;
  return axiosInstance.get(`/get/patient/${patient_id}/appointments?page=${page}&limit=${limit}`);
}

export const deleteUserAppointments = (appointment_id) => {
  return axiosInstance.delete(`/delete/patient/${appointment_id}/deleteApp`);
}

export const getUserRecords = (page, limit) => {
  const state = store.getState();
  const patient_id = state.authData?.userId;
  return axiosInstance.get(`/get/patient/${patient_id}/medications?page=${page}&limit=${limit}`);
}

export const getUserDataById = (id) => {
  return axiosInstance.get(`/admin/get-patient/${id}`);
}

export const updateUserProfile = (data) => {
  const state = store.getState();
  const patient_id = state.authData?.userId;
  return axiosInstance.put(`/admin/update-patient/${patient_id}`, data);
}

