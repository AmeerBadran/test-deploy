/* eslint-disable react/prop-types */
import { FaCheck } from 'react-icons/fa';
import { IoTime } from 'react-icons/io5';
import { MdDateRange } from 'react-icons/md';
import { PiNotebookDuotone } from 'react-icons/pi';
import { toast } from 'react-toastify';

const AppointmentTableRow = ({ item, onDelete, doneAppointment, appType }) => {
  const handleDelete = () => {
    onDelete(item._id);
  };

  const handleDone = () => {
    doneAppointment && doneAppointment(item._id);
    toast.success("Approved Go to the records page to view the patient")
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toISOString().split('T')[0];
  };

  return (
    <tr>
      {appType === 'doctor' &&
        <td className="p-3 flex justify-center items-center">
          {doneAppointment && (
            <button
              type="button"
              onClick={handleDone}
              className="w-8 h-8 rounded-md hover:bg-green-700 bg-green-600 flex justify-center items-center"
            >
              <FaCheck className="text-white" />
            </button>
          )}
        </td>
      }
      <td className="p-3 text-center">
        <h1 className="font-bold">{item.name}</h1>
        <div className="flex gap-3 text-gray-600 text-sm justify-center">
          <p className="flex items-center">
            <PiNotebookDuotone className="mr-1 text-blue-500" />
            {item.details}
          </p>
          <p className="flex items-center">
            <MdDateRange className="mr-1 text-green-500" />
            {formatDate(item.date)}
          </p>
          <p className="flex items-center">
            <IoTime className="mr-1 text-yellow-500" />
            {item.time}
          </p>
        </div>
      </td>
      <td className="text-red-600 p-3 text-center">
        {item.email}
      </td>
      <td className="p-3 text-center">
        <div className="flex justify-center items-center gap-2 pl-2">
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 px-4 py-2 rounded flex justify-center items-center hover:bg-red-800 text-white"
          >
            Cancel appointment
            {/* <FaTrashAlt className="text-white" /> */}
          </button>
        </div>
      </td>
    </tr >
  );
};

export default AppointmentTableRow;
