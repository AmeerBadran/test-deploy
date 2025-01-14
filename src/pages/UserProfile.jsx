import { Link, Outlet, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import userImage from '../assets/images/userProfile.png'

const UserProfile = () => {

  const location = useLocation();
  const authData = useSelector((state) => state.authData);
  return (
    <div className="max-w-[1300px] mx-auto px-4">
      <div className="slg:grid slg:grid-cols-4 mt-20 mb-20">
        <div className="shadow-lg flex flex-col 2xmobile:flex-row slg:flex-col items-center mb-[75px] rounded-lg justify-between">
          <div className="p-6 flex flex-col items-center">
            <div className="p-2 size-56 xl:size-64 mt-5 border-4 border-[#0E485E] flex justify-center items-center rounded-full overflow-hidden">
              <div className="w-60 rounded-full overflow-hidden">
                <img src={userImage} alt="" />
              </div>
            </div>
            <h1 className="text-xl ml-6 slg:ml-0 font-semibold text-[#0E485E] mt-5">
              {authData.allUserData.first_Name} {authData.allUserData.last_Name}
            </h1>
          </div>
          <div className="w-full">
          <Link to="profile">
              <div
                className={`p-4 ${location.pathname === "/userProfile/profile"
                  ? "bg-[#0E485E33] hover:bg-[#0E485E44] border-l-4 shadow-inner shadow-[#0E485E44] border-[#0E485E]"
                  : "hover:bg-[#0E485E33]"
                  } text-lg font-semibold text-[#0E485E] transition-all duration-300`}
              >
                <p>Profile</p>
              </div>
            </Link>
            <Link to="userAppointment">
              <div
                className={`p-4 ${location.pathname === "/userProfile/userAppointment"
                  ? "bg-[#0E485E33] hover:bg-[#0E485E44] border-l-4 shadow-inner shadow-[#0E485E44] border-[#0E485E]"
                  : "hover:bg-[#0E485E33]"
                  } text-lg font-semibold text-[#0E485E] transition-all duration-300`}
              >
                <p>Appointments</p>
              </div>
            </Link>
            <Link to="userRecords">
              <div
                className={`p-4 ${location.pathname === "/userProfile/userRecords"
                  ? "bg-[#0E485E33] hover:bg-[#0E485E44] border-l-4 shadow-inner shadow-[#0E485E44] border-[#0E485E]"
                  : "hover:bg-[#0E485E33]"
                  } text-lg font-semibold text-[#0E485E] rounded-b-lg transition-all duration-300`}
              >
                <p>Records</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-span-3 ml-6">
          <Outlet />
        </div>


      </div>
    </div>
  );
};

export default UserProfile;
