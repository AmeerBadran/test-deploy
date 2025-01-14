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
  return axiosInstance.get(`/count/countDoctor`);
}

export const getDoctors = () => {
  return axiosInstance.get('/get/doctors/1/4');
}

export const getDoctors2 = (page) => {
  return axiosInstance.get(`/get/doctors/${page}/8`);
}

export const doctorsSearch = (data) => {
  const { city, specialty } = data;
  return axiosInstance.post(`/get/search`, { city, specialty });
};

export const searchValues = () => {
  return axiosInstance.get('/get/searchData');
}

export const getDoctorData = (id) => {
  return axiosInstance.get(`/get/doctor/${id}`);
}

export const updateDoctorData = (doctorId,doctorData) => {
  return axiosInstance.put(`/admin/update-doctor/${doctorId}`, doctorData);
}
