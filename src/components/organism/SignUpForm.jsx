import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { useState } from 'react';

const allergiesOptions = ['Peanuts', 'Gluten', 'Shellfish', 'Soy', 'Dairy'];

const SignUpForm = () => {
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      idNumber: '',
      allergy: [],
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits')
        .required('Required'),
      idNumber: Yup.string()
        .min(9, "Enter valid id 'minimum 9 numbers'")
        .matches(/^[0-9]+$/, 'Must be only digits')
        .required('Required'),
    }),
    onSubmit: values => {
      values.allergy = selectedAllergies; // تحديث قيمة الحساسية في الـ formik
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h1 className='text-2xl font-bold text-gray-900 mb-6'>Personal Information</h1>
      <p className='text-sm text-gray-400 mb-6'>Already have an account? <Link to='logIn' className='text-blue-400 hover:text-blue-600'>Log In now</Link></p>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            {...formik.getFieldProps('firstName')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.firstName}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            {...formik.getFieldProps('lastName')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.lastName}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps('email')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="text"
            {...formik.getFieldProps('phoneNumber')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">
            Enter your ID number
          </label>
          <input
            id="idNumber"
            type="text"
            {...formik.getFieldProps('idNumber')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {formik.touched.idNumber && formik.errors.idNumber ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.idNumber}</p>
          ) : null}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Note: If you have an allergy, mention it here.
          </label>
          <Autocomplete
            multiple
            id="allergy-select"
            options={allergiesOptions}
            getOptionLabel={(option) => option}
            value={selectedAllergies}
            onChange={(event, newValue) => {
              setSelectedAllergies(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Select Allergies"
                placeholder="Choose..."
              />
            )}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => {
                // eslint-disable-next-line no-unused-vars
                const { key, ...restTagProps } = getTagProps({ index });
                return (
                  <Chip
                    key={index}
                    label={option}
                    {...restTagProps}
                    onDelete={() => {
                      setSelectedAllergies((prev) =>
                        prev.filter((item) => item !== option)
                      );
                    }}
                  />
                );
              })
            }
          />
        </div>

        <div className='flex justify-between text-center mt-4'>
          <button
            type="submit"
            className="w-36 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
