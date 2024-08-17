/* eslint-disable react/prop-types */
import { FaDownload, FaRegMoneyBillAlt } from 'react-icons/fa';
import { MdDateRange, MdNoteAlt } from 'react-icons/md';
import { BiSolidNote } from 'react-icons/bi';

const ReportCard = ({
  name,
  procedure,
  date,
  cost,
  reports,
  medicalRecordText,
  notesText,
}) => {
  return (
    <div className="p-6 shadow-lg bg-[#0E485E05] rounded-md border border-[#e5e7eb99] flex flex-col gap-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-lg font-bold text-[#0E485E]">{name}</h1>
          <p className="text-xs font-medium text-[#156184]">{procedure}</p>
        </div>
        <button
          type="button"
          className="flex justify-center items-center w-9 h-9 rounded-md bg-[#1E84B5] hover:bg-[#19719a] text-white min-w-9"
        >
          <FaDownload />
        </button>
      </div>
      <div className="flex gap-4 text-[#156184]">
        <div className="flex items-center gap-2">
          <MdDateRange />
          <p>{date}</p>
        </div>
        <div className="flex items-center gap-2">
          <FaRegMoneyBillAlt />
          <p>{cost}</p>
        </div>
      </div>
      <div className="flex gap-3 flex-wrap text-[#156184]">
        {reports.map((report, index) => (
          <div
            key={index}
            className="bg-[#15618425] text-sm text-gray-600 py-1 px-2 rounded"
          >
            <p>{report}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-4 text-[#156184]">
        <div className="flex items-center gap-2">
          <BiSolidNote />
          <p>{medicalRecordText}</p>
        </div>
        <div className="flex items-center gap-2">
          <MdNoteAlt />
          <p>{notesText}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;