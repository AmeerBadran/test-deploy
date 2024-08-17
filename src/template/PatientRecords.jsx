import PaginationRounded from "../components/molecule/PaginationRounded";
import ReportCard from "../components/molecule/ReportCard";
import { reportData } from "../constants/reportsData";

export default function PatientRecords() {
  const handlePageChange = (page) => {
    console.log('Selected Page:', page);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0E485E] mb-5">
        <span className="text-[#1E84B5]">Patient</span> Records
      </h1>
      <div className="grid grid-cols-1 2md:grid-cols-2 gap-6">
      {reportData.map((data, index) => (
        <ReportCard
          key={index}
          name={data.name}
          procedure={data.procedure}
          date={data.date}
          cost={data.cost}
          reports={data.reports}
          medicalRecordText={data.medicalRecordText}
          notesText={data.notesText}
        />
      ))}
      </div>
      <PaginationRounded count={8} onPageChange={handlePageChange} theme='light' />
    </div>
  )
}
