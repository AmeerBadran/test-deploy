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
  return axiosInstance.get(`/count/countPatient`);;
}