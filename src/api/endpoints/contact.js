import axiosInstance from "../axios";

export const sendContact = (contactData) => {
  return axiosInstance.post('/add/addContact', contactData);;
}