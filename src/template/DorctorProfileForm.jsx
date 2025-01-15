import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Autocomplete, Chip, TextField } from "@mui/material";
import * as Yup from "yup";
import { getDoctorDataById } from "../api/endpoints/doctorsPage";
import { updateDoctorData } from "../api/endpoints/doctors";

export default function DoctorProfileForm() {
  const [userData, setUserData] = useState(null);
  const [daysWork, setDaysWork] = useState([]);
  const id = useSelector((state) => state.authData.userId);

  const daysOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const fetchDoctorData = async (doctorId) => {
    try {
      const response = await getDoctorDataById(doctorId);
      setUserData(response.data);
      setDaysWork(response.data?.DaysWork || [])
    } catch (error) {
      console.error("Error fetching doctor data:", error);
      toast.error("Failed to load profile data.");
    }
  };

  useEffect(() => {
    if (id) {
      fetchDoctorData(id);
    }
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_Name: userData?.first_Name || "",
      last_Name: userData?.last_Name || "",
      insurance: userData?.insurance || "",
      phone: userData?.phone || "",
      country: userData?.country || "",
      city: userData?.city || "",
      experience: userData?.experience || "",
      specialization: userData?.specialization || "",
      description: userData?.description || "",
      StartTime: userData?.StartTime || "",
      EndTime: userData?.EndTime || "",
      DaysWork: userData?.DaysWork || [],
      avatar: userData?.avatar || "",
    },
    validationSchema: Yup.object({
      first_Name: Yup.string().required("First name is required"),
      last_Name: Yup.string().required("Last name is required"),
      phone: Yup.string().required("Phone number is required"),
      country: Yup.string().required("Country is required"),
      city: Yup.string().required("City is required"),
      experience: Yup.string().required("Experience is required"),
      specialization: Yup.string().required("Specialization is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await updateDoctorData(id, { ...values, avatar: undefined });
        if (response.status === 200) {
          toast.success("Profile updated successfully! Please log in again.");
        } else {
          toast.error("Failed to update profile.");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("An error occurred while updating your profile.");
      }
    },
  });

  return (
    <div className="p-6 mx-auto bg-[#0E485E] bg-opacity-20 rounded-lg border col-span-3 w-full lg:ml-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <form onSubmit={formik.handleSubmit} className="p-6 mx-auto bg-white rounded-lg">

        <div className="grid grid-cols-2 gap-5">
          {["first_Name", "last_Name", "country", "city", "experience", "specialization", "description", "phone"].map(
            (field) => (
              <div key={field} className="mb-4">
                <label htmlFor={field} className="block text-gray-700 capitalize">
                  {field.replace("_", " ")}
                </label>
                <input
                  id={field}
                  name={field}
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values[field]}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
                {formik.errors[field] && formik.touched[field] && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors[field]}</p>
                )}
              </div>
            )
          )}
        </div>

        <div className="grid grid-cols-2 gap-5">
          {["StartTime", "EndTime"].map((field) => (
            <div key={field} className="mb-4">
              <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                {field.replace("Time", " Time")}
              </label>
              <input
                id={field}
                name={field}
                type="time"
                onChange={formik.handleChange}
                value={formik.values[field]}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label htmlFor="DaysWork" className="block text-sm font-medium text-gray-700">
            Days of Work
          </label>
          <Autocomplete
            multiple
            id="DaysWork"
            options={daysOptions}
            value={daysWork}
            onChange={(event, newValue) => setDaysWork(newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return (
                  <Chip
                    key={key}
                    label={option}
                    className="bg-[#0E485E] text-white"
                    {...tagProps}
                  />
                );
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Select working days"
                className="border-gray-300 focus:ring-[#0E485E] focus:border-[#0E485E]"
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
