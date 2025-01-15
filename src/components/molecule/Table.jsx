/* eslint-disable react/prop-types */
import { useState } from "react";
import { doneAppointment } from "../../api/endpoints/doctorsPage";
import MedicationModal from "../organism/MedicationModal";
import AppointmentTableRow from "./AppointmentTableRow";
import RecordesTableRow from "./RecordesTableRow";
import VisitsModal from "../organism/VisitsModal";
import { toast } from "react-toastify";

export default function Table({ tableData = [], onDelete, tableType, onBanned, appType = 'doctor' }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalVisitsOpen, setModalVisitsOpen] = useState(false);
  const [initialRecords, setInitialRecords] = useState([]);
  const [patientId, setPatientId] = useState();

  const openModal = (id) => {
    setModalVisitsOpen(false);
    setModalOpen(true);
    setPatientId(id);
  };

  const openVisitsModal = (id, records) => {
    setModalOpen(false);
    setModalVisitsOpen(true);
    setPatientId(id);
    setInitialRecords(records);
  };

  const closeModal = () => setModalOpen(false);
  const closeVisitsModal = () => setModalVisitsOpen(false);

  const handleDoneAppointment = async (id) => {
    try {
      await doneAppointment(id);
      toast.success("Approved! Go to the records page to view the patient");
    } catch (error) {
      toast.error("Failed to mark the appointment as done. Please try again.");
    }
  };

  const headers = {
    appointment: appType === 'doctor'
      ? ['Check Done', 'Patient Name', 'Date & Time', 'Email', 'Condition']
      : ['Patient Name', 'Date & Time', 'Email', 'Condition'],
    records: appType === 'doctor'
      ? ['Add Record', 'Patient Name', 'Email', 'Condition']
      : ['Patient Name', 'Email', 'Condition'],
  };

  return (
    <>
      <table className="w-full mt-6 shadow-md mr-6 border-1 border-[#0E4156] rounded-xl">
        <thead className="bg-[#0E4156] text-lg text-left text-white">
          <tr>
            {headers[tableType]?.map((header, index) => (
              <th key={index} className="font-bold p-4 text-center">{header}</th>
            ))}
          </tr>
        </thead>

        {Array.isArray(tableData) && tableData.length > 0 ? (
          <tbody>
            {tableData.map((item) =>
              tableType === 'appointment' ? (
                <AppointmentTableRow
                  key={item._id}
                  item={item}
                  onDelete={onDelete}
                  onBanned={onBanned}
                  appType={appType}
                  doneAppointment={handleDoneAppointment}
                />
              ) : (
                <RecordesTableRow
                  key={item._id}
                  item={item}
                  openModal={openModal}
                  appType={appType}
                  openVisitsModal={openVisitsModal}
                />
              )
            )}
          </tbody>
        ) : (
          <p className="text-2xl font-black text-center my-10">No Data</p>
        )}
      </table>

      {tableType === 'records' && (
        <>
          <MedicationModal
            isOpen={isModalOpen}
            onClose={closeModal}
            medicationId={patientId}
          />
          <VisitsModal
            isOpen={isModalVisitsOpen}
            onClose={closeVisitsModal}
            initialRecords={initialRecords}
            medicationId={patientId}
            appType={appType}
          />
        </>
      )}
    </>
  );
}

