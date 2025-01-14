import axiosInstance from "../axios";

export const logIn = (loginData) => {
  console.log("hi")
  return axiosInstance.post('/auth/login', loginData, {
    withCredentials: true
  });;
}

export const logOut = () => {
  return axiosInstance.post('/auth/logout', {}, {
    withCredentials: true
  });
}

export const signUp = (signUpData) => {
  return axiosInstance.post('/auth/signup', signUpData, {
    withCredentials: true
  });
}

export const refresh = () => {
  return axiosInstance.post('/auth/refresh', {}, {
    withCredentials: true
  });;
}