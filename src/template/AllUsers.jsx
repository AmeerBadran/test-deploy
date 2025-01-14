import PaginationRounded from '../components/molecule/PaginationRounded';
import { useEffect, useState } from 'react';
import ReactLoading from "react-loading";
import { getUsersCount, getUsersForAdmin } from '../api/endpoints/admin';

export default function AllUsers() {
  const [pageNumber, setPageNumber] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const [doctorCount, setDoctorCount] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const handlePageChange = (page) => {
    setPageNumber(page);
  };


  useEffect(() => {
    const fetchDoctors = async (pageNumber) => {
      try {
        setLoading(true);
        const response = await getUsersForAdmin(pageNumber, 8);
        const response2 = await getUsersCount();
        console.log(response2);
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
              <th className="border px-2 py-3 text-left text-lg font-bold text-[#0E485E]">birthdate</th>
              <th className="border px-2 py-3 text-left text-lg font-bold text-[#0E485E]">Phone</th>
              <th className="border px-2 py-3 text-left text-lg font-bold text-[#0E485E]">Email</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id}>
                <td className="border px-2 py-2 flex items-center gap-2">
                  {doctor.first_Name} {doctor.last_Name}
                </td>
                <td className="border px-2 py-2">{doctor.birthdate}</td>
                <td className="border px-2 py-2">{doctor.phone}</td>
                <td className="border px-2 py-2">{doctor.email}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <PaginationRounded count={doctorCount} onPageChange={handlePageChange} theme="light" />
      
    </div>
  );
}