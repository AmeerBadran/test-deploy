import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserDataById, updateUserProfile } from "../api/endpoints/userProfile";
import { toast } from "react-toastify";
import { Autocomplete, Chip, TextField } from "@mui/material";

const allergiesOptions = ['Peanuts', 'Gluten', 'Shellfish', 'Soy', 'Dairy'];
const insuranceOptions = ['No Insurance', 'Pal Health', 'Almashreq'];

export default function UserProfileForm() {
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [userData, setUserData] = useState(null);
  const id = useSelector((state) => state.authData.userId);

  const getUserData = async (userId) => {
    try {
      const response = await getUserDataById(userId);
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.error(e);
      return { error: "not_found" };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await getUserData(id);
        setSelectedAllergies(data.chronic_diseases)
        setUserData(data);
      }
    };
    fetchData();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      first_Name: '',
      last_Name: '',
      insurance: '',
      phone: '',
      chronic_diseases: [],
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        values.chronic_diseases = selectedAllergies;
        console.log(values)
        const response = await updateUserProfile(values);
        if (response.status === 200) {
          toast.success("Data updated successfully");
        } else {
          toast.error("Data was not updated correctly");
        }
      } catch (e) {
        console.error(e);
        toast.error("Data was not updated correctly");
      }
    },
  });

  useEffect(() => {
    if (userData) {
      formik.setValues({
        first_Name: userData.first_Name || '',
        last_Name: userData.last_Name || '',
        insurance: userData.insurance || '',
        phone: userData.phone || '',
        chronic_diseases: userData.chronic_diseases || [],
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <div className="p-6 mx-auto bg-[#0E485E] bg-opacity-20 rounded-lg border col-span-3 w-full lg:ml-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <form onSubmit={formik.handleSubmit} className="p-6 mx-auto bg-white rounded-lg">
        <div className="mb-4">
          <label htmlFor="first_Name" className="block text-gray-700">First Name</label>
          <input
            id="first_Name"
            {...formik.getFieldProps("first_Name")}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="last_Name" className="block text-gray-700">Last Name</label>
          <input
            id="last_Name"
            {...formik.getFieldProps("last_Name")}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700">Phone Number</label>
          <input
            id="phone"
            {...formik.getFieldProps("phone")}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="insurance" className="block text-sm font-medium text-gray-700">
            Insurance
          </label>
          <select
            id="insurance"
            {...formik.getFieldProps("insurance")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select Insurance</option>
            {insuranceOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="chronic_diseases" className="block text-sm font-medium text-gray-700">
            Chronic Diseases
          </label>
          <Autocomplete
            multiple
            id="chronic_diseases"
            options={allergiesOptions}
            value={selectedAllergies}
            onChange={(event, newValue) => {
              setSelectedAllergies(newValue);
            }}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={index}
                  label={option}
                  {...getTagProps}
                  onDelete={() => {
                    setSelectedAllergies((prev) =>
                      prev.filter((item) => item !== option)
                    );
                  }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Add chronic diseases"
              />
            )}
          />
        </div>
        <button
          type="submit"
          className="bg-[#0E485E] hover:bg-opacity-90 text-white py-2 mt-5 px-4 rounded-md transition-all duration-300"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
