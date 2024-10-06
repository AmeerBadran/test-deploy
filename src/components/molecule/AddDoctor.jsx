/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useFormik } from 'formik';
import { LuUploadCloud } from "react-icons/lu";
import { addDoctor } from '../../api/endpoints/doctors';

const ImageUpload = ({ setFieldValue }) => {
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue('avatar', file); // Update field name to 'avatar'
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center border-2 border-dashed w-64 h-64 rounded-full cursor-pointer bg-gray-100 border-gray-400 hover:bg-gray-200 "
      >
        <div className="flex flex-col items-center justify-center rounded-full">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Image preview"
              className="object-contain w-full rounded-full"
            />
          ) : (
            <div className='flex flex-col justify-center items-center gap-3 p-6 text-center'>
              <LuUploadCloud className='text-gray-500 text-3xl' />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
          )}
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
};

const DoctorForm = () => {
  const formik = useFormik({
    initialValues: {
      last_Name: '',
      first_Name: '',
      gender: '',
      birthdate: '',
      qualification: '',
      experience: '',
      specialization: '',
      description: '',
      phone: '',
      email: '',
      password: '',
      country: '',
      city: '',
      workTime: '',
      postalCode: '', // Not used in the backend, can be removed if not required
      avatar: null,
    },
    onSubmit: async (values) => {
      try {
        await addDoctor(values);
        alert('Doctor created successfully');
      } catch (error) {
        console.error('Error creating doctor:', error);
        alert('Failed to create doctor');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mx-auto p-4 bg-white shadow-xl shadow-gray-400 rounded-md pl-10 pb-10">
      <h1 className='my-4 text-xl font-bold text-[#0E394D]'>Add Doctor</h1>
      <div className="grid grid-cols-1 2xmobile:grid-cols-2 2md:grid-cols-3 gap-4 items-center">
        <div>
          <label htmlFor="first_Name" className="block text-sm font-medium text-gray-700">
            First Name:
          </label>
          <input
            id="first_Name"
            name="first_Name"
            type="text"
            {...formik.getFieldProps('first_Name')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="last_Name" className="block text-sm font-medium text-gray-700">
            Last Name:
          </label>
          <input
            id="last_Name"
            name="last_Name"
            type="text"
            {...formik.getFieldProps('last_Name')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            {...formik.getFieldProps('gender')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          >
            <option value="" label="Select gender" />
            <option value="male" label="Male" />
            <option value="female" label="Female" />
          </select>
        </div>

        <div>
          <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
            Birthdate:
          </label>
          <input
            id="birthdate"
            name="birthdate"
            type="date" // Change to 'date' for birthdate input
            {...formik.getFieldProps('birthdate')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
            Qualification:
          </label>
          <input
            id="qualification"
            name="qualification"
            type="text"
            {...formik.getFieldProps('qualification')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
            Experience:
          </label>
          <input
            id="experience"
            name="experience"
            type="text"
            {...formik.getFieldProps('experience')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
            Specialization:
          </label>
          <input
            id="specialization"
            name="specialization"
            type="text"
            {...formik.getFieldProps('specialization')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>
        <div className="mt-4 col-span-1 2xmobile:col-span-2 md:col-span-3">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            {...formik.getFieldProps('description')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>
      </div>

      <h1 className='mb-6 mt-14 text-xl font-bold text-[#0E394D]'>Contact Information</h1>

      <div className='grid grid-cols-1 2xmobile:grid-cols-2 md:grid-cols-3 gap-4'>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number:
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            {...formik.getFieldProps('phone')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            {...formik.getFieldProps('email')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            {...formik.getFieldProps('password')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>


        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country:
          </label>
          <input
            id="country"
            name="country"
            type="text"
            {...formik.getFieldProps('country')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City:
          </label>
          <input
            id="city"
            name="city"
            type="text"
            {...formik.getFieldProps('city')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="workTime" className="block text-sm font-medium text-gray-700">
            WorkTime:
          </label>
          <input
            id="workTime"
            name="workTime"
            placeholder='Like "8:00 AM - 2:00 PM"'
            type="text"
            {...formik.getFieldProps('workTime')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
            Postal Code:
          </label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            {...formik.getFieldProps('postalCode')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>
      </div>
      <h1 className='mb-8 mt-16 text-xl font-bold text-[#0E394D]'>Profile Image</h1>
      <ImageUpload setFieldValue={formik.setFieldValue} />

      <div className='mt-8 flex justify-end items-center gap-4'>
        <button
          type="submit"
          className="px-4 py-2 bg-[#0E394D] hover:bg-blue-700 text-white font-bold rounded-md"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default DoctorForm;
