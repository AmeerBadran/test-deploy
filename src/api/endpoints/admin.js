
import axiosInstance from "../axios";

export const getAppointmentForAdmin = (page, limit) => {
  return axiosInstance.get(`/admin/get-appointments/${page}/${limit}`);;
}

export const getMedicationsForAdmin = (page, limit) => {
  return axiosInstance.get(`/admin/get-medications/${page}/${limit}`);;
}

export const getUsersForAdmin = (page, limit) => {
  return axiosInstance.get(`/admin/get-patients/${page}/${limit}`);;
}

export const getUsersCount = () => {
  return axiosInstance.get(`/count/countPatient`);
}

export const makeUserAdmin = (userId, role) => {

  let changeTo;
  if (role === 'admin') {
    changeTo = 'patient';
  } else if (role === 'patient') {
    changeTo = 'admin';
  }
  role = changeTo;
  return axiosInstance.put(`/admin//change-patient/${userId}`, { role });
}
export const getAllAppointmentsCount = () => {
  return axiosInstance.get(`/count/countAppointment`);
}

export const getAllMedicationCount = () => {
  return axiosInstance.get(`/count/countMedication`);
}

export const deleteUserById = (id) => {
  return axiosInstance.delete(`/admin/delete-patient/${id}`);
}

