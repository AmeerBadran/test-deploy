import { useSelector } from "react-redux";
import PaginationRounded from "../components/molecule/PaginationRounded";
import Table from "../components/molecule/Table";
import { useEffect, useState } from "react";
import { deleteAppointment, getAppointments, countAppointments } from "../api/endpoints/doctorsPage";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

export default function UserAppointment() {
  const authData = useSelector((state) => state.authData);
  const [pageNumber, setPageNumber] = useState(1);
  const [countNumber, setCountNumber] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  useEffect(() => {
    const callAppointments = async (pageNumber, doctorId) => {
      try {
        setLoading(true); // Start loading
        const response = await getAppointments(pageNumber, 6, doctorId);
        const response2 = await countAppointments(doctorId);
        setAppointments(response.data);
        setCountNumber(Math.ceil(response2.data.count / 6));
      } catch (error) {
        toast.error(error.message || "Failed to load appointments");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    callAppointments(pageNumber, authData.userId);
  }, [pageNumber, authData.userId]);

  const handleDeleteAppointment = async (id) => {
    try {
      await deleteAppointment(id);
      setAppointments(appointments.filter((appointment) => appointment.id !== id));
      toast.success("Appointment deleted successfully");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to delete appointment");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0E485E]">
        <span className="text-[#1E84B5]">My</span> Appointment
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ReactLoading type="spin" color="#1E84B5" height={50} width={50} />
        </div>
      ) : (
        <Table tableData={appointments} onDelete={handleDeleteAppointment} tableType={'appointment'} />
      )}
      <PaginationRounded count={countNumber} onPageChange={handlePageChange} theme='light' />
    </div>
  );
}
