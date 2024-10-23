import { useSelector } from "react-redux";
import PaginationRounded from "../components/molecule/PaginationRounded";
import Table from "../components/molecule/Table";
import { useEffect, useState } from "react";
import { deleteAppointment, getAppointments } from "../api/endpoints/doctorsPage";
import { countAppointments } from "../api/endpoints/doctorsPage"
import { toast } from "react-toastify";

export default function Appointment() {
  const authData = useSelector((state) => state.authData);
  const [pageNumber, setPageNumber] = useState(1)
  const [countNumber, setCountNumber] = useState(0);
  const [appointments, setAppointments] = useState([])
  const handlePageChange = (page) => {
    setPageNumber(page)
  };

  console.log(authData.userId)

  useEffect(() => {
    const callAppointments = async (pageNumber, doctorId) => {
      try {
        const response = await getAppointments(1, 6, '670d0c9237ff170900c87fa0')
        console.log(response.data)
        const response2 = await countAppointments(doctorId);
        setAppointments(response.data)
        setCountNumber(Math.ceil(response2.data.count / 6));
      } catch (error) {
        toast.error(error)
      }
    }
    callAppointments(pageNumber, authData.userId)
  }, [pageNumber, authData.userId])

  useEffect(() => {
    console.log(appointments)
  }, [appointments])

  const handleDeleteAppointment = async (id) => {
    await deleteAppointment(id);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0E485E]">
        <span className="text-[#1E84B5]">Appointment</span> management
      </h1>
      <Table tableData={appointments} onDelete={handleDeleteAppointment} />
      <PaginationRounded count={countNumber} onPageChange={handlePageChange} theme='light' />
    </div>
  )
}
