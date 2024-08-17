import { Link, Outlet, useLocation } from "react-router-dom";
import doctor1 from "../assets/images/team-1.jpg";
const MainDoctor = () => {
  const location = useLocation();
  return (
    <div className="max-w-[1300px] mx-auto px-4">
      <div className="slg:grid slg:grid-cols-4 mt-20 mb-20">
        <div className="shadow-lg flex flex-col 2xmobile:flex-row slg:flex-col items-center mb-[75px] rounded-lg justify-between">
          <div className="p-6 flex flex-col items-center">
            <div className="p-2 size-56 xl:size-64 mt-5 border-4 border-[#0E485E] flex justify-center items-center rounded-full overflow-hidden">
              <div className="w-60 rounded-full overflow-hidden">
                <img src={doctor1} alt="" />
              </div>
            </div>
            <h1 className="text-xl ml-6 slg:ml-0 font-semibold text-[#0E485E] mt-5">
              Dr. Ahmad Al-Ali
            </h1>
          </div>
          <div className="w-full">
            <Link to="">
              <div
                className={`p-4 ${location.pathname === "/mainDoctor"
                    ? "bg-[#0E485E33] hover:bg-[#0E485E44] border-l-4 shadow-inner shadow-[#0E485E44] border-[#0E485E]"
                    : "hover:bg-[#0E485E33]"
                  } text-lg font-semibold text-[#0E485E] transition-all duration-300`}
              >
                <p>Appointments</p>
              </div>
            </Link>
            <Link to="patientRecords">
              <div
                className={`p-4 ${location.pathname === "/mainDoctor/patientRecords"
                    ? "bg-[#0E485E33] hover:bg-[#0E485E44] border-l-4 shadow-inner shadow-[#0E485E44] border-[#0E485E]"
                    : "hover:bg-[#0E485E33]"
                  } text-lg font-semibold text-[#0E485E] rounded-b-lg transition-all duration-300`}
              >
                <p>PatientRecords</p>
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

export default MainDoctor;
