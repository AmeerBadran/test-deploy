/* eslint-disable react/prop-types */
import { useState } from "react";
import { doneAppointment } from "../../api/endpoints/doctorsPage";
import MedicationModal from "../organism/MedicationModal";
import AppointmentTableRow from "./AppointmentTableRow";
import RecordesTableRow from "./RecordesTableRow";
import VisitsModal from "../organism/VisitsModal";

export default function Table({ tableData, onDelete, tableType }) {

  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalVisitsOpen, setModalVisitsOpen] = useState(false);
  const [initialRecords, setInitialRecords] = useState([])
  const [patientId, setPatientId] = useState()
  const openModal = (id) => {
    setModalVisitsOpen(false)
    setModalOpen(true)
    setPatientId(id)
  };

  const openVisitsModal = (id, records) => {
    setModalOpen(false)
    setModalVisitsOpen(true)
    setPatientId(id)
    setInitialRecords(records)
  };

  const closeModal = () => setModalOpen(false);
  const closeVisitsModal = () => setModalVisitsOpen(false);

  const handleDoneAppointment = async (id) => {
    await doneAppointment(id);
  };



  const headers = {
    appointment: ['Check Done', 'Reservations', 'Date', 'Condition'],
    records: ['Add Record', 'Patient Name', 'Email', 'Condition'],
  };

  return (
    <>
      <table className="w-full mt-6 shadow-md mr-6 border-1 border-[#0E4156] rounded-xl">
        <thead className="bg-[#0E4156] text-lg text-left text-white">
          <tr>
            {headers[tableType]?.map((header, index) => (
              <th key={index} className="font-bold p-4">{header}</th>
            ))}
          </tr>
        </thead>

        {tableData.length > 0 && (
          <tbody>
            {tableData.map((item) =>
              tableType === 'appointment' ? (
                <AppointmentTableRow
                  key={item._id}
                  item={item}
                  onDelete={onDelete}
                  doneAppointment={handleDoneAppointment}
                />
              ) : (
                <RecordesTableRow key={item._id} item={item} openModal={openModal} openVisitsModal={openVisitsModal} />
              )
            )}
          </tbody>
        )}
      </table>
      {tableData.length === 0 && (
        <p className="text-2xl font-black text-center my-10">No Data</p>
      )}
      {tableType === 'records' ?
        <>
          <MedicationModal
            isOpen={isModalOpen}
            onClose={closeModal}
            medicationId={patientId} />

          <VisitsModal
            isOpen={isModalVisitsOpen}
            onClose={closeVisitsModal}
            initialRecords={initialRecords}
            medicationId={patientId}
          />
        </>
        : <></>}
    </>
  );
}
