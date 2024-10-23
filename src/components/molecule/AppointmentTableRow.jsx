/* eslint-disable react/prop-types */
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import { IoTime } from 'react-icons/io5';
import { MdDateRange } from 'react-icons/md';
import { PiNotebookDuotone } from 'react-icons/pi';

const AppointmentTableRow = ({ item, onDelete }) => {
  const handleDelete = () => {
    onDelete(item._id);
  };
  return (
    <tr>
      <td className="p-3">
        <h1 className="font-bold">{item.name}</h1>
        <div className="flex gap-3 text-gray-600 text-sm">
          <p className="flex items-center">
            <PiNotebookDuotone className="mr-1 text-blue-500" />
            {item.details}
          </p>
          <p className="flex items-center">
            <MdDateRange className="mr-1 text-green-500" />
            {item.date}
          </p>
          <p className="flex items-center">
            <IoTime className="mr-1 text-yellow-500" />
            {item.time}
          </p>
        </div>
      </td>
      <td className="text-red-600 p-3">
        {item.date}
      </td>
      <td className="p-3">
        <div className="flex items-center gap-2 pl-2">
          <button className="bg-blue-600 w-8 h-8 rounded flex justify-center items-center hover:bg-blue-800">
            <FaEye className="text-white" />
          </button>
          <button type="button" onClick={handleDelete} className="bg-red-600 w-8 h-8 rounded flex justify-center items-center hover:bg-red-800">
            <FaTrashAlt className="text-white" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AppointmentTableRow;
