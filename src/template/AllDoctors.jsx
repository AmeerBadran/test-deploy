import { BsEyeFill } from 'react-icons/bs';
import PaginationRounded from '../components/molecule/PaginationRounded';
import { useEffect, useState } from 'react';
import { getDoctors2, getDoctorsCount, updateDoctorData } from '../api/endpoints/doctors';
import ReactLoading from "react-loading";
import { DoctorInfoModal } from '../components/organism/DoctorInfoModal';
import { toast } from 'react-toastify';

export default function AllDoctors() {
  const [pageNumber, setPageNumber] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const [doctorCount, setDoctorCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorData, setDoctorData] = useState(null);

  const handleUpdate = async (doctorId, updatedData) => {
    try {
      const response = await updateDoctorData(doctorId, updatedData);
      if (response.status === 200) {
        toast.success("Data updated successfully");
        setDoctors((prevDoctors) =>
          prevDoctors.map((doctor) =>
            doctor._id === doctorId
              ? { ...doctor, ...updatedData } // Merge updated fields into the doctor object
              : doctor
          )
        );
        // Update modal data if the current doctor is being viewed
        setDoctorData((prevDoctorData) =>
          prevDoctorData && prevDoctorData._id === doctorId
            ? { ...prevDoctorData, ...updatedData }
            : prevDoctorData
        );
      } else {
        toast.error("Error updating doctor data");
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  const handleViewDetails = (doctor) => {
    setDoctorData(doctor);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchDoctors = async (pageNumber) => {
      try {
        setLoading(true);
        const response = await getDoctors2(pageNumber);
        const response2 = await getDoctorsCount();
        setDoctors(response.data);
        setDoctorCount(Math.ceil(response2.data.count / 8));
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors(pageNumber);
  }, [pageNumber]);

  return (
    <div className="p-6 mx-auto bg-[#0E485E] bg-opacity-20 rounded-lg border col-span-3 w-full lg:ml-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">All Doctors</h1>
      {loading ? (
        <div className="flex justify-center items-center h-96 w-full">
          <ReactLoading type="spin" color="#0E485E" height={70} width={70} />
        </div>
      ) : (
        <table className="bg-white w-full border-2 border-[#0E485E]">
          <thead>
            <tr>
              <th className="border px-2 py-3 text-left text-lg font-bold text-[#0E485E]">Name</th>
              <th className="border px-2 py-3 text-left text-lg font-bold text-[#0E485E]">Location</th>
              <th className="border px-2 py-3 text-left text-lg font-bold text-[#0E485E]">Phone</th>
              <th className="border px-2 py-3 text-left text-lg font-bold text-[#0E485E]">Email</th>
              <th className="border px-2 py-3 text-left text-lg font-bold text-[#0E485E]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id}>
                <td className="border px-2 py-2 flex items-center gap-2">
                  <img
                    src={`https://cos-server-rndb.onrender.com/uploads/avatar/${doctor.avatar}`}
                    alt="Doctor Avatar"
                    className="w-10 h-10 rounded-full border border-[#0E485E]"
                  />
                  {doctor.first_Name} {doctor.last_Name}
                </td>
                <td className="border px-2 py-2">{doctor.country}-{doctor.city}</td>
                <td className="border px-2 py-2">{doctor.phone}</td>
                <td className="border px-2 py-2">{doctor.email}</td>
                
                <td className="border px-2 py-2">
                  <button
                    onClick={() => handleViewDetails(doctor)}
                    className="w-full flex justify-center items-center font-medium text-white bg-blue-600 hover:bg-blue-700 border border-transparent rounded-md py-1 px-3"
                  >
                    <BsEyeFill className="text-white text-2xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <PaginationRounded count={doctorCount} onPageChange={handlePageChange} theme="light" />
      {isModalOpen && (
        <DoctorInfoModal
          doctor={doctorData}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}