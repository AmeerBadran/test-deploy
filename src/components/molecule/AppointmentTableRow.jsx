/* eslint-disable react/prop-types */
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import { IoLocationSharp, IoTime } from 'react-icons/io5';

const AppointmentTableRow = ({ item }) => {
  return (
    <tr>
      <td className="p-6">
        <div className="flex items-center">
          <input
            id={`checkbox-${item.id}`}
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor={`checkbox-${item.id}`} className="sr-only">checkbox</label>
        </div>
      </td>
      <td className="p-3">
        <h1 className="font-bold">{item.name}</h1>
        <div className="flex gap-3 text-gray-600 text-sm">
          <p className="flex items-center">
            <IoLocationSharp className="mr-1 text-blue-500" />
            {item.description}
          </p>
          <p className="flex items-center">
            <IoTime className="mr-1 text-yellow-500" />
            {item.timeAgo}
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
          <button className="bg-red-600 w-8 h-8 rounded flex justify-center items-center hover:bg-red-800">
            <FaTrashAlt className="text-white" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AppointmentTableRow;
