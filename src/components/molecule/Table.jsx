import { appointmentData } from "../../constants/appointmentData";
import AppointmentTableRow from "./AppointmentTableRow";

export default function Table() {
  return (
    <table className="w-full mt-6 shadow-md mr-6 border-1 border-[#0E4156] rounded-xl">
      <thead className="bg-[#0E4156] text-lg text-left text-white">
        <tr>
          <th className="p-6">
          </th>
          <th className="font-bold p-4">
            Reservations
          </th>
          <th className="font-bold p-4">
            Date
          </th>
          <th className="font-bold p-4">
            Condition
          </th>
        </tr>
      </thead>
      <tbody>
        {appointmentData.map((item) => (
          <AppointmentTableRow key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  )
}
