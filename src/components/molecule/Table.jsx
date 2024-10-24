/* eslint-disable react/prop-types */

// import { appointmentData } from "../../constants/appointmentData";
import AppointmentTableRow from "./AppointmentTableRow";

export default function Table({ tableData, onDelete, tableType, doneAppointment }) {
  console.log(tableData)
  return (
    <>
      <table className="w-full mt-6 shadow-md mr-6 border-1 border-[#0E4156] rounded-xl">
        <thead className="bg-[#0E4156] text-lg text-left text-white">
          <tr>
            <th className="font-bold p-4">
              {tableType === 'appointment' ? 'Check Done' : 'Add Record'}
            </th>
            <th className="font-bold p-4">
              {tableType === 'appointment' ? 'Reservations' : 'Patient Name'}
            </th>
            <th className="font-bold p-4">
              {tableType === 'appointment' ? 'Date' : 'Email'}
            </th>
            <th className="font-bold p-4">
              {tableType === 'appointment' ? 'Condition' : 'Phone Number'}
            </th>
          </tr>
        </thead>

        {tableData.length > 0 ?
          <tbody>
            {tableType === 'appointment' ?

              tableData.map((item) => (
                <AppointmentTableRow key={item._id} item={item} onDelete={onDelete} doneAppointment={doneAppointment} />
              ))
              :
              tableData.map((item) => (
                <AppointmentTableRow key={item._id} item={item} onDelete={onDelete} />
              ))
            }

          </tbody>
          : <></>}
      </table>
      {tableData.length <= 0 ?
        <p className="text-2xl font-black text-center my-10">No Data</p>
        : <></>}
    </>
  )
}
