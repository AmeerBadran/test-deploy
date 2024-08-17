
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
import Appointment from "../template/Appointment ";
import PatientRecords from "../template/PatientRecords";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <Home />
        ),
      },
      {
        path: "/doctors",
        element: (
          <Doctors />
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
          <Admin />
        ),
      },
      {
        path: "/mainDoctor",
        element: <MainDoctor />,
        children: [
          {

            path: "/mainDoctor",
            element: (
              <Appointment />
            ),
          },
          {

            path: "/mainDoctor/patientRecords",
            element: (
              <PatientRecords />
            ),
          },
        ]
      },
      {
        path: "/logIn",
        element: (
          <LogIn />
        ),
      },
      {
        path: "/signUp",
        element: (
          <SignUp />
        ),
      },
      {
        path: '*',
        element: (
          <NotFound />
        )
      },
    ],
  },

]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
