import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "../components/HOC/RootLayout";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import ContactUs from "../pages/ContactUs";
import Doctors from "../pages/Doctors";
import NotFound from "../pages/NotFound";
import AddDoctor from "../pages/AddDoctor";
import Admin from "../pages/Admin";
import MainDoctor from "../pages/MainDoctor";
import Appointment from "../template/Appointment";
import PatientRecords from "../template/PatientRecords";
import ProtectdRoute from "../components/HOC/withProtect";
import NotProtectdRoute from "../components/HOC/withNotProtect";
import PersistLogin from "../components/HOC/PersistLogin";
import UserProfile from "../pages/UserProfile";
import UserAppointment from "../template/UserAppointment";
import UserRecords from "../template/UserRecords";
import AllAppointments from "../template/AllAppointments";
import AllUsers from "../template/AllUsers";
import AllDoctors from "../template/AllDoctors";
import UserProfileForm from "../template/UserProfileForm";
import DoctorProfileForm from "../template/DorctorProfileForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <PersistLogin />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: "/doctors",
            element: (
              <ProtectdRoute path="/doctors" element={<Doctors />} />
            ),
          },
          {
            path: "/contactUs",
            element: (
              <ContactUs />
            ),
          },
          {
            path: "/addDoctor",
            element: (
              <ProtectdRoute path="/addDoctor" element={<AddDoctor />} />
            ),
          },
          {
            path: "/admin",
            element: (
              <ProtectdRoute path="/admin" element={<Admin />} />
            ),
            children: [
              {
                path: "profile",
                element: <UserProfileForm />,
              },
              {
                path: "allUsers",
                element: <AllUsers />,
              },
              {
                path: "allDoctors",
                element: <AllDoctors />,
              },
              {
                path: "appointment",
                element: <AllAppointments />,
              },
            ]
          },
          {
            path: "/mainDoctor",
            element: (
              <ProtectdRoute path="/mainDoctor" element={<MainDoctor />} />
            ),
            children: [
              {
                path: "profile",
                element: <DoctorProfileForm />,
              },
              {
                path: "appointment",
                element: <Appointment />,
              },
              {
                path: "patientRecords",
                element: <PatientRecords />,
              },
            ]
          },
          {
            path: "/userProfile",
            element: (
              <ProtectdRoute path="/userProfile" element={<UserProfile />} />
            ),
            children: [
              {
                path: "profile",
                element: <UserProfileForm />,
              },
              {
                path: "userAppointment",
                element: <UserAppointment />,
              },
              {
                path: "userRecords",
                element: <UserRecords />,
              },
            ]
          },
        ],
      },
      {
        path: "/logIn",
        element: (
          <NotProtectdRoute path="/logIn" element={<LogIn />} />
        ),
      },
      {
        path: "/signUp",
        element: (
          <NotProtectdRoute path="/signUp" element={<SignUp />} />
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
],{
  basename: '/test-deploy/'
});

export default function AppRouter() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
