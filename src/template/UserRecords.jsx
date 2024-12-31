import { useEffect, useState } from "react";
import PaginationRounded from "../components/molecule/PaginationRounded";
import Table from "../components/molecule/Table";
import ReactLoading from "react-loading";
import { getUserRecords } from "../api/endpoints/userProfile";

export default function UserRecords() {
  const [pageNumber, setPageNumber] = useState(1);
  const [reportData, setReportData] = useState([]);
  const [dataCount, setDataCount] = useState(0)
  const [loading, setLoading] = useState(true);

  const handlePageChange = (page) => {
    setPageNumber(page);
  };


  useEffect(() => {
    const callPatientRecords = async (pageNumber) => {
      try {
        setLoading(true);
        const response = await getUserRecords(pageNumber, 6);
        setDataCount(response.data.pagination.totalPages);
        setReportData(response.data.data);

        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        //
      } finally {
        setLoading(false)
      }
    };
    callPatientRecords(pageNumber);
  }, [pageNumber]);

  const handleDeleteAppointment = async () => {
    console.log('deleted')
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0E485E] mb-5">
        <span className="text-[#1E84B5]">Patient</span> Records
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ReactLoading type="spin" color="#1E84B5" height={50} width={50} />
        </div>
      ) : (
        <Table
          tableData={reportData}
          onDelete={handleDeleteAppointment}
          tableType="records"
          appType={'user'}
        />
      )}
      <PaginationRounded count={dataCount} onPageChange={handlePageChange} theme="light" />
    </div>
  );
}