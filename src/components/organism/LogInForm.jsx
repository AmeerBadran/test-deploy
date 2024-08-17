import { useFormik } from 'formik';
import * as Yup from 'yup';

const LogInForm = () => {
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h1 className='text-4xl font-black text-[#0E384C] mt-3 mb-2'>Log In</h1>
      <p className='text-sm text-gray-400 mb-6'>If you have an account with us, please log in.</p>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
            User Name
          </label>
          <input
            id="userName"
            type="text"
            {...formik.getFieldProps('userName')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {formik.touched.userName && formik.errors.userName ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.userName}</p>
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
