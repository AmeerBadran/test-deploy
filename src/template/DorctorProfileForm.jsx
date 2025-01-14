import { useFormik } from "formik";
import { useEffect, useState } from "react";
//import { useSelector } from "react-redux";
import { updateUserProfile } from "../api/endpoints/userProfile";
import { toast } from "react-toastify";
import { IoMdCloudUpload } from 'react-icons/io';
import { useSelector } from "react-redux";
import { Autocomplete, Chip, TextField } from "@mui/material";
export default function DoctorProfileForm() {

  const [avatarPreview, setAvatarPreview] = useState('');
  const [ourAvatar, setOurAvatar] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const daysOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


  const authData = useSelector((state) => state.authData);
  // const [userData, setUserData] = useState(null);
  // const id = useSelector((state) => state.authData.userId);

  // const getUserData = async (userId) => {
  //   try {
  //     const response = await getUserDataById(userId);
  //     return response.data;
  //   } catch (e) {
  //     console.log(e)
  //     return { error: "not_found" };
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (id) {
  //       const data = await getUserData(id);
  //       setUserData(data);
  //     }
  //   };

  //   fetchData();
  // }, [id]);

  const formik = useFormik({
    initialValues: {
      first_Name: 'userData.first_Name.value',
      last_Name: 'userData.last_Name',
      insurance: 'userData.insurance',
      phone: 'userData.phone',
      country: 'userData.country',
      city: 'userData.city',
      experience: 'userData.experience',
      specialization: 'userData.specialization',
      description: 'userData.description',
      StartTime: 'userData.StartTime',
      EndTime: 'userData.EndTime',
      DaysWork: 'userData.DaysWork',
      avatar: 'userData.avatar',
    },

    onSubmit: async (values) => {
      try {
        const response = await updateUserProfile(values);
        if (response.status === 200) {
          toast.success("Data updated successfully Please Login again");
        } else {
          toast.error("Data does not updated correctly")
        }
      } catch (e) {
        console.log(e);
        toast.error("Data does not updated correctly")
      }

    },
  });
  useEffect(() => {
    if (!avatarPreview) {
      setOurAvatar(authData.allUserData.avatar);
    } else {
      setOurAvatar(avatarPreview);
    }
  }, [avatarPreview, authData.allUserData.avatar])
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue('avatar', file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="p-6 mx-auto bg-[#0E485E] bg-opacity-20 rounded-lg border col-span-3 w-full lg:ml-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <form onSubmit={formik.handleSubmit} className="p-6 mx-auto bg-white rounded-lg ">
        <div className="mb-4 border-b pb-4">
          <label className="block text-gray-700">Your Avatar</label>
          <div className="flex items-center space-x-4 ">
            <img
              src={`https://cos-server-rndb.onrender.com/uploads/avatar/${ourAvatar}`}
              alt="Avatar Preview"
              className="w-20 h-20 rounded-full my-4 object-cover  border-4 border-base-color"
            />
            <label
              htmlFor="avatar"
              className="cursor-pointer bg-[#0E485E] hover:bg-opacity-90 w-12 h-12 flex justify-center items-center text-white  rounded-md transition-all duration-300"
            >
              <IoMdCloudUpload className='text-2xl' />
            </label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleAvatarChange}
              className="hidden "
            />
          </div>
          <p className="text-gray-500 mt-2">PNG or JPG no bigger than 800px width and height</p>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div >
            <label htmlFor="first_Name" className="block text-gray-700">First Name</label>
            <input
              id="first_Name"
              name="first_Name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.first_Name}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="last_Name" className="block text-gray-700">Last Name</label>
            <input
              id="last_Name"
              name="last_Name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.last_Name}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700">Country</label>
            <input
              id="country"
              name="country"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.country}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700">City</label>
            <input
              id="city"
              name="city"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.city}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="experience" className="block text-gray-700">Experience</label>
          <input
            id="experience"
            name="experience"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.experience}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="specialization" className="block text-gray-700">Specialization</label>
          <input
            id="specialization"
            name="specialization"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.specialization}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.phone}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
        <div>
          <label htmlFor="StartTime" className="block text-sm font-medium text-gray-700">
            Start Time:
          </label>
          <input
            id="StartTime"
            name="StartTime"
            type="time"
            step="60"
            {...formik.getFieldProps('StartTime')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="EndTime" className="block text-sm font-medium text-gray-700">
            End Time:
          </label>
          <input
            id="EndTime"
            name="EndTime"
            type="time"
            step="60"
            {...formik.getFieldProps('EndTime')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>
        </div>
        <div className="col-span-2 md:col-span-3">
          <label htmlFor="DaysWork" className="block text-sm font-medium text-gray-700">
            Days of Work:
          </label>
          <Autocomplete
            multiple
            id="DaysWork"
            options={daysOptions}
            value={selectedDays}
            onChange={(event, newValue) => {
              setSelectedDays(newValue);
            }}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={index}
                  label={option}
                  {...getTagProps({ index })}
                  onDelete={() => {
                    setSelectedDays((prev) =>
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
                placeholder="Select working days"
              />
            )}
          />
        </div>
        <button type="submit" className=" bg-[#0E485E] hover:bg-opacity-90  text-white py-2 mt-5 px-4 rounded-md transition-all duration-300">Update Profile</button>
      </form >
    </div >
  )
}
