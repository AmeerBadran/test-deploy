import { useFormik } from 'formik';
import { Link/*, useNavigate*/ } from 'react-router-dom';
import * as Yup from 'yup';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { signUp } from '../../api/endpoints/auth';

const allergiesOptions = ['Peanuts', 'Gluten', 'Shellfish', 'Soy', 'Dairy'];
const genderOptions = ['male', 'female'];
const insuranceOptions = ['No Insurance', 'Pal Health', 'Almashreq']

const SignUpForm = () => {
  //const navigate = useNavigate();
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  const callSignUp = async (signUpData) => {
    try {
      const response = await signUp(signUpData);
      toast.success('Your Data Inserted Successflly');

      return response;
    } catch (error) {
      toast.error(error || 'Sign Up failed. Please try again.');
      return { error: "Sign Up failed. Please try again." };
    }
  }

  const formik = useFormik({
    initialValues: {
      first_Name: '',
      last_Name: '',
      email: '',
      phone: '',
      patient_id: '',
      gender: '',
      insurance: '',
      birthdate: '',
      note: '',
      chronic_diseases: [],
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      first_Name: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      last_Name: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      phone: Yup.string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits')
        .required('Required'),
      patient_id: Yup.string()
        .min(9, "Enter valid ID (minimum 9 numbers)")
        .matches(/^[0-9]+$/, 'Must be only digits')
        .required('Required'),
      gender: Yup.string().required('Required'),
      insurance: Yup.string().required('Required'),
      birthdate: Yup.date().required('Required'),
      note: Yup.string().max(200, 'Must be 200 characters or less'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required')
    }),
    onSubmit: async values => {
      values.chronic_diseases = selectedAllergies;
      await callSignUp(values);
      //navigate('/logIn');
    },
  });

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h1 className='text-2xl font-bold text-gray-900 mb-6'>Personal Information</h1>
      <p className='text-sm text-gray-400 mb-6'>Already have an account? <Link to='logIn' className='text-blue-400 hover:text-blue-600'>Log In now</Link></p>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 justify-between'>
          <div>
            <label htmlFor="first_Name" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="first_Name"
              type="text"
              {...formik.getFieldProps('first_Name')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {formik.touched.first_Name && formik.errors.first_Name ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.first_Name}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="last_Name" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="last_Name"
              type="text"
              {...formik.getFieldProps('last_Name')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {formik.touched.last_Name && formik.errors.last_Name ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.last_Name}</p>
            ) : null}
          </div>
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
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 justify-between'>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps('password')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...formik.getFieldProps('confirmPassword')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
            ) : null}
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            {...formik.getFieldProps('phone')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="patient_id" className="block text-sm font-medium text-gray-700">
            Enter your ID number
          </label>
          <input
            id="patient_id"
            type="text"
            {...formik.getFieldProps('patient_id')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {formik.touched.patient_id && formik.errors.patient_id ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.patient_id}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            {...formik.getFieldProps('gender')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select Gender</option>
            {genderOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {formik.touched.gender && formik.errors.gender ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.gender}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="insurance" className="block text-sm font-medium text-gray-700">
            Insurance
          </label>
          <select
            id="insurance"
            {...formik.getFieldProps('insurance')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select Insurance</option>
            {insuranceOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {formik.touched.insurance && formik.errors.insurance ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.insurance}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
            Birthdate
          </label>
          <input
            id="birthdate"
            type="date"
            {...formik.getFieldProps('birthdate')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {formik.touched.birthdate && formik.errors.birthdate ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.birthdate}</p>
          ) : null}
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

        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Note
          </label>
          <textarea
            id="note"
            {...formik.getFieldProps('note')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {formik.touched.note && formik.errors.note ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.note}</p>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;

