import axiosInstance from "../axios";
import { store } from '../../app/store';
import { getUserDataById } from "./userProfile";
export const getmedications = (page, limit) => {
  const state = store.getState();
  const doctorId = state.authData?.userId;
  return axiosInstance.get(`/get/medications/${doctorId}/${page}/${limit}`);
}

export const getPatientForRecords = (page, limit, filter) => {
  const state = store.getState();
  const doctorId = state.authData?.userId;
  return axiosInstance.get(`get/medications/${doctorId}/${page}/${limit}/${filter}`);
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

// export const deleteMedication = (id) => {
//   return axiosInstance.delete(`/delete/addMedTDelApp/${id}`);
// }

export const addRecord = (medicationId, visitData) => {
  const id = Math.floor(Math.random() * 10000) + 1;
  const { cash, date, description, note } = visitData;
  return axiosInstance.post(`/add/addVisit`, { medicationId, id, cash, date, description, note });
}

export const updateVisit = (medicationId, updatedData) => {
  const visitId = updatedData._id;
  return axiosInstance.put(`/update/visits`, { medicationId, visitId, updatedData });
}

export const deleteVisit = (medicationId, visitId) => {
  return axiosInstance.delete(`/delete/visit/${medicationId}/${visitId}`);
}

export const increaseBannedValue = async (userId) => {
  const response = await getUserDataById(userId);
  console.log(response)
  if (response.data.banned >= 3) {
    return false;
  } else {
    return axiosInstance.put(`/admin/increase-banned/${userId}`);
  }
}

export const getDoctorDataById = (id) => {
  return axiosInstance.get(`/admin/get-doctor/${id}`);
}