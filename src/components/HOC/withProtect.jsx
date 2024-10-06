/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

export default function ProtectdRoute({ element, path }) {
  const authData = useSelector((state) => state.authData);
  const { accessToken, userRole } = authData;
console.log(userRole)
  const [lastToastTime, setLastToastTime] = useState(0);
  const [navigatePath, setNavigatePath] = useState(null);

  useEffect(() => {
    const now = Date.now();
    const timeElapsed = now - lastToastTime;

    if (accessToken) {
      if (
        (userRole !== 'doctor' && userRole !== 'admin') &&
        (path === '/mainDoctor' || path === '/mainDoctor/appointment' || path === '/mainDoctor/patientRecords')
      ) {
        if (timeElapsed > 30000) {
          toast.error('You do not have permission to access this link.');
          setLastToastTime(now);
        }
        setNavigatePath('/');
      } else if (userRole !== 'admin' && path === '/admin') {
        if (timeElapsed > 40000) {
          toast.error('You do not have permission to access this link.');
          setLastToastTime(now);
        }
        setNavigatePath('/');
      }
    }
  }, [userRole, path, lastToastTime, accessToken]);

  if (!accessToken) {
    return <Navigate to='/login' />;
  }

  if (navigatePath) {
    return <Navigate to={navigatePath} />;
  }

  return element;
}
