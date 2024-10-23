import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { logIn } from '../../api/endpoints/auth';
import { saveAuthData } from '../../features/authData/authDataSlice';

const LogInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const callLogIn = async (loginData) => {
    try {
      const response = await logIn(loginData);
      console.log(response)
      if (response.data.success) {
        return response;
      } else {
        return { error: "Login failed. Please try again." };
      }
    } catch (error) {
      toast.error("Login failed:", error);
      return { error: "Login failed. Please try again." };
    }
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Required'),
      password: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      const response = await callLogIn(values);
      if (response.error) {
        toast.error(response.error || 'Login failed. Please try again.');
      } else {
        toast.success(response.data.message)
        
        dispatch(saveAuthData({
          accessToken: response.data.accessToken,
          userData: response.data.userData,
          userRole: response.data.userRole,
        }));
        navigate('/');
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h1 className='text-4xl font-black text-[#0E384C] mt-3 mb-2'>Log In</h1>
      <p className='text-sm text-gray-400 mb-6'>If you have an account with us, please log in.</p>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="text"
            {...formik.getFieldProps('email')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          ) : null}
        </div>

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
        <div className='flex justify-between text-center mt-4'>
          <button
            type="submit"
            className=" w-36 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
          <button type='button' className='text-blue-500 text-sm hover:text-blue-700'>forget password?</button>
        </div>
      </form>
    </div>
  );
};

export default LogInForm;
