import axiosInstance from "../axios";

export const addAppointment = (appointmentData) => {
  return axiosInstance.post('/add/addAppointment', appointmentData);;
}