import axiosInstance from "../axios";

export const addDoctor = (doctorData) => {
  console.log(doctorData)
  const formData = new FormData();
  Object.keys(doctorData).forEach(key => {
    formData.append(key, doctorData[key]);
  });

  return axiosInstance.post(`/add/admin`, doctorData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getDoctorsCount = () => {
  return axiosInstance.get(`/count/countDoctor`);;
}

export const getDoctors = () => {
  return axiosInstance.get('/get/doctors/1/4');;
}

export const getDoctors2 = (page) => {
  return axiosInstance.get(`/get/doctors/${page}/8`);;
}