/* eslint-disable react/prop-types */
import { FaEye, FaNotesMedical, FaTrashAlt } from 'react-icons/fa';

const RecordesTableRow = ({ item, openModal }) => {

  return (
    <tr>
      <td className="p-3 flex justify-center items-center">
        <button type="button" onClick={() => openModal(item._id)} className='w-8 h-8 rounded-md hover:bg-green-700 bg-green-600 flex justify-center items-center'><FaNotesMedical className='text-white' /></button>
      </td>
      <td className="p-3">
        {item.name}

      </td>
      <td className="p-3">
        {item.email}

      </td>
      <td className="p-3">
        <div className="flex items-center gap-2 pl-2">
          <button className="bg-blue-600 w-8 h-8 rounded flex justify-center items-center hover:bg-blue-800">
            <FaEye className="text-white" />
          </button>

          <button type="button" className="bg-red-600 w-8 h-8 rounded flex justify-center items-center hover:bg-red-800">
            <FaTrashAlt className="text-white" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default RecordesTableRow;
