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
import Admin from "../pages/Admin";
import MainDoctor from "../pages/MainDoctor";
import Appointment from "../template/Appointment";
import PatientRecords from "../template/PatientRecords";
import ProtectdRoute from "../components/HOC/withProtect";
import NotProtectdRoute from "../components/HOC/withNotProtect";
import PersistLogin from "../components/HOC/PersistLogin";
import UserProfile from "../pages/UserProfile";
import UserAppointment from "../template/userAppointment";
import UserRecords from "../template/UserRecords";

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
            path: "/admin",
            element: (
              <ProtectdRoute path="/admin" element={<Admin />} />
            ),
          },
          {
            path: "/mainDoctor",
            element: (
              <ProtectdRoute path="/mainDoctor" element={<MainDoctor />} />
            ),
            children: [
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
], {
  basename: "/test-deploy/",
});

export default function AppRouter() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
