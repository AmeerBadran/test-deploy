import { useEffect, useState } from "react";
import PaginationRounded from "../components/molecule/PaginationRounded";
import { getPatientForRecords } from "../api/endpoints/doctorsPage";
import { toast } from "react-toastify";
import Table from "../components/molecule/Table";
import ReactLoading from "react-loading";

export default function PatientRecords() {
  const [pageNumber, setPageNumber] = useState(1);
  const [reportData, setReportData] = useState([]);
  const [filter, setFilter] = useState("empty"); // Default empty filter
  const [dataCount, setDataCount] = useState(0)
  const [loading, setLoading] = useState(true);

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const callPatientRecords = async (pageNumber) => {
      try {
        setLoading(true);
        const response = await getPatientForRecords(pageNumber, 6, filter);
        console.log(response.data)
        setDataCount(response.data.pagination.totalPages);
        setReportData(response.data.data);

      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false)
      }
    };
    callPatientRecords(pageNumber);
  }, [pageNumber, filter]);

  const handleDeleteAppointment = async () => {
    console.log('deleted')
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0E485E] mb-5">
        <span className="text-[#1E84B5]">Patient</span> Records
      </h1>

      {/* Filter Select */}
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">Filter by status:</label>
        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="empty">All</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ReactLoading type="spin" color="#1E84B5" height={50} width={50} />
        </div>
      ) : (
        <Table
          tableData={reportData}
          onDelete={handleDeleteAppointment}
          tableType="records"
        />
      )}
      <PaginationRounded count={dataCount} onPageChange={handlePageChange} theme="light" />
    </div>
  );
}