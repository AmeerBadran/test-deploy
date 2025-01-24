import PaginationRounded from '../components/molecule/PaginationRounded';
import { useEffect, useState } from 'react';
import ReactLoading from "react-loading";
import { deleteUserById, getUsersCount, getUsersForAdmin, makeUserAdmin } from '../api/endpoints/admin';
import { increaseBannedValue } from '../api/endpoints/doctorsPage';
import { toast } from 'react-toastify';
import { FiXCircle } from 'react-icons/fi';
import { GrUserAdmin } from 'react-icons/gr';
import { FaTrashCan } from 'react-icons/fa6';

export default function AllUsers() {
  const [pageNumber, setPageNumber] = useState(1);
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(1);
  const [loading, setLoading] = useState(true);

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  useEffect(() => {
    const fetchUsers = async (pageNumber) => {
      try {
        setLoading(true);
        const response = await getUsersForAdmin(pageNumber, 8);
        const response2 = await getUsersCount();
        setUsers(response.data);
        setUserCount(Math.ceil(response2.data.count / 8));
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers(pageNumber);
  }, [pageNumber]);

  const handleBanned = async (id, fname, lname) => {
    try {
      const response = await increaseBannedValue(id);
      if (response.data.success === false) {
        toast.warn("This user is already banned")
      } else {
        if (response.status === 200) {
          toast.success(`Add one banned to ${fname} ${lname}`);
        } else {
          toast.error(`Not Changed`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserToAdmin = async (id, fname, lname, role) => {
    try {
      const response = await makeUserAdmin(id, role);
      if (response.status === 200) {
        if (role === 'user') {
          toast.success(`${fname} ${lname} is admin now`);
        } else {
          toast.success(`${fname} ${lname} is user now`);
        }
      } else {
        toast.error(`Error make admin`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (id, fname, lname) => {
    try {
      const response = await deleteUserById(id);
      if (response.status === 200) {
          toast.success(`${fname} ${lname} Deleted successfully`);
      } else {
        toast.error(`Error : ${fname} ${lname} Does not deleted`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-6 mx-auto bg-[#0E485E] bg-opacity-20 rounded-lg border col-span-3 w-full lg:ml-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>
      {loading ? (
        <div className="flex justify-center items-center h-96 w-full">
          <ReactLoading type="spin" color="#0E485E" height={70} width={70} />
        </div>
      ) : (
        <table className="bg-white w-full border-2 border-[#0E485E]">
          <thead>
            <tr>
              <th className="border px-2 py-3 text-left text-lg font-bold text-[#0E485E]">Name</th>
              <th className="border px-2 py-3 text-left text-lg font-bold text-[#0E485E]">birthdate</th>
              <th className="border px-2 py-3 text-left text-lg font-bold text-[#0E485E]">Phone</th>
              <th className="border px-2 py-3 text-left text-lg font-bold text-[#0E485E]">Email</th>
              <th className="border px-2 py-3 text-left text-lg font-bold text-[#0E485E]">Warning</th>
              <th className="border px-2 py-3 text-left text-lg font-bold text-[#0E485E]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-2 py-2">
                  {user.first_Name} {user.last_Name}
                </td>
                <td className="border px-2 py-2">{user.birthdate}</td>
                <td className="border px-2 py-2">{user.phone}</td>
                <td className="border px-2 py-2">{user.email}</td>
                <td className="border px-2 py-2 text-center">{user.banned}</td>
                <td className="border px-1 py-2 flex h-16 w-full justify-around items-center">
                  <button title='Add one warn' onClick={() => handleBanned(user._id, user.first_Name, user.last_Name)} className=''><FiXCircle className='text-amber-600 text-xl' /></button>
                  <button title='Make admin' onClick={() => handleUserToAdmin(user._id, user.first_Name, user.last_Name, user.role)} className=''><GrUserAdmin className='text-green-600 text-xl' /></button>
                  <button title='Delete User' onClick={() => handleDeleteUser(user._id, user.first_Name, user.last_Name)} className=''><FaTrashCan className='text-red-600 text-xl' /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <PaginationRounded count={userCount} onPageChange={handlePageChange} theme="light" />
    </div>
  );
}
