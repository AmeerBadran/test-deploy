/* eslint-disable react/prop-types */
import { FaEye, FaNotesMedical } from 'react-icons/fa';
const RecordesTableRow = ({ item, openModal, openVisitsModal, appType }) => {
  return (

    <tr>
      {appType === 'doctor' &&
        <td className="p-3 flex justify-center items-center">
          <button type="button" onClick={() => openModal(item._id)} className='w-8 h-8 rounded-md hover:bg-green-700 bg-green-600 flex justify-center items-center'><FaNotesMedical className='text-white' /></button>
        </td>
      }
      <td className="p-3 text-center">
        {item.name}

      </td>
      <td className="p-3 text-center">
        {item.email}

      </td>
      <td className="p-3 text-center">
        <div className="flex items-center gap-2 pl-2 justify-center">
          <button onClick={() => openVisitsModal(item._id, item.visits)} className="bg-blue-600 w-8 h-8 rounded flex justify-center items-center hover:bg-blue-800">
            <FaEye className="text-white" />
          </button>
        </div>
      </td>
    </tr >

  );
};

export default RecordesTableRow;
