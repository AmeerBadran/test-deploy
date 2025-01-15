/* eslint-disable react/prop-types */
import { BiAlarmOff } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';
import { FiAlertOctagon } from 'react-icons/fi';
import { toast } from 'react-toastify';

const AppointmentTableRow = ({ item, onDelete, onBanned, doneAppointment, appType }) => {
  const handleDelete = () => {
    onDelete(item._id);
  };
  const handleBanned = () => {
    onBanned(item.patient_id,item.name);
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
      </td>
      <td className="p-3 text-center">
        {formatDate(item.date)}/{item.time}
      </td>
      <td className="text-red-600 p-3 text-center">
        {item.email}
      </td>
      <td className="p-3 text-center">
        <div className="flex justify-center items-center gap-2 pl-2">
          <button
            type="button"
            onClick={handleDelete}
            title='Delete this appointment'
            className="bg-red-600 px-4 py-2 rounded flex justify-center items-center hover:bg-red-800 text-white"
          >
            <BiAlarmOff className='text-2xl' />
          </button>
          {appType === 'admin' || appType === 'doctor' ?
            <button
              type="button"
              title='Add one banned'
              onClick={handleBanned}
              className="bg-amber-600 px-4 py-2 rounded flex justify-center items-center hover:bg-amber-500 text-white"
            >
              <FiAlertOctagon className='text-2xl' />
            </button>
            : (<div></div>)}
        </div>
      </td>
    </tr >
  );
};

export default AppointmentTableRow;
