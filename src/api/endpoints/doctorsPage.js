import axiosInstance from "../axios";
import { store } from '../../app/store';

export const getmedications = (page, limit) => {
  const state = store.getState();
  const doctorId = state.authData?.userId;
  console.log(doctorId)
  return axiosInstance.get(`/get/medications/${doctorId}/${page}/${limit}`);
}

export const getPatientRecords = (page, limit) => {
  return axiosInstance.get(`/get/patientRecords/${page}/${limit}`);
}

export const getAppointments = (page, limit, doctor_id) => {
  return axiosInstance.get(`/get/appointment/${page}/${limit}/${doctor_id}`);
}

export const countAppointments = (doctor_id) => {
  return axiosInstance.get(`/count/countAppForDoctor/${doctor_id}`);
}

export const countMedications = (doctor_id) => {
  return axiosInstance.get(`/count/countMedication/${doctor_id}`);
}

export const deleteAppointment = (id) => {
  return axiosInstance.delete(`/delete/appointment/${id}`);
}

export const doneAppointment = (id) => {
  return axiosInstance.post(`/add/addMedTDelApp/${id}`);
}


