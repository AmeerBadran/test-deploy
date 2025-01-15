import { useSelector } from "react-redux";
import PaginationRounded from "../components/molecule/PaginationRounded";
import Table from "../components/molecule/Table";
import { useEffect, useState } from "react";
//import { deleteAppointment } from "../api/endpoints/doctorsPage";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import { deleteUserAppointments } from "../api/endpoints/userProfile";
import { getAllAppointmentsCount, getAppointmentForAdmin } from "../api/endpoints/admin";
import { increaseBannedValue } from "../api/endpoints/doctorsPage";

export default function AllAppointments() {
  const authData = useSelector((state) => state.authData);
  const [pageNumber, setPageNumber] = useState(1);
  const [countNumber, setCountNumber] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  useEffect(() => {
    const callAppointments = async (pageNumber) => {
      try {
        setLoading(true);
        const response = await getAppointmentForAdmin(pageNumber, 6);
        setAppointments(response.data);
        const response2 = await getAllAppointmentsCount();
        setCountNumber(Math.ceil(response2.data.count / 6));

        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        //
      } finally {
        setLoading(false);
      }
    };

    callAppointments(pageNumber, authData.userId);
  }, [pageNumber, authData.userId]);

  const handleDeleteAppointment = async (id) => {
    try {
      await deleteUserAppointments(id);
      setAppointments(appointments.filter((appointment) => appointment._id !== id));
      toast.success("Appointment deleted successfully");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to delete appointment");
    }
  };

  const handleBanned = async (id, fname, lname) => {
      try {
        const response = await increaseBannedValue(id);
        if (response.status === 200) {
          toast.success(`Add one warn to ${fname} ${lname}`);
        } else {
          toast.error(`Not Changed`);
        }
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0E485E]">
        <span className="text-[#1E84B5]">All</span> Appointment
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ReactLoading type="spin" color="#1E84B5" height={50} width={50} />
        </div>
      ) : (
        <Table tableData={appointments} onDelete={handleDeleteAppointment} onBanned={handleBanned} tableType={'appointment'} appType={'admin'} />
      )}
      <PaginationRounded count={countNumber} onPageChange={handlePageChange} theme='light' />
    </div>
  );
}
