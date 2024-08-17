/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useFormik } from 'formik';
import { LuUploadCloud } from "react-icons/lu";


const ImageUpload = ({ setFieldValue }) => {
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue('image', file);
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
      lastName: '',
      firstName: '',
      age: '',
      qualification: '',
      experience: '',
      specialization: '',
      description: '',
      phoneNumber: '',
      email: '',
      country: '',
      city: '',
      postalCode: '',
      image: null,
    },
    onSubmit: (values) => {
      console.log('Form data:', values);
      console.log('Image file:', values.image);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mx-auto p-4 bg-white shadow-xl shadow-gray-400 rounded-md pl-10 pb-10">
      <h1 className='my-4 text-xl font-bold text-[#0E394D]'>Add Doctor</h1>
      <div className="grid grid-cols-1 2xmobile:grid-cols-2 2md:grid-cols-3 gap-4 items-center">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name:
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            {...formik.getFieldProps('firstName')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />

        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name:
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            {...formik.getFieldProps('lastName')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age:
          </label>
          <input
            id="age"
            name="age"
            type="number"
            {...formik.getFieldProps('age')}
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
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number:
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            {...formik.getFieldProps('phoneNumber')}
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
      <div className="mt-6 flex justify-center">
        <ImageUpload setFieldValue={formik.setFieldValue} />
      </div>

      <div className="mt-8 w-2/6 min-w-44 max-w-64 flex mx-auto">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default DoctorForm;
