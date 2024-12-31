import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { addAppointment } from '../../api/endpoints/appointment';

// eslint-disable-next-line react/prop-types
const AppointmentModal = ({ doctorId, handleCloseModal, doctorStartTime, daysWork, doctorEndTime }) => {
  const patientId = useSelector((state) => state.authData.userId);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const isDayDisabled = ({ date }) => {
    const day = date.toLocaleString('en-US', { weekday: 'short' });
    // eslint-disable-next-line react/prop-types
    return !daysWork.includes(day) || date < new Date();
  };

  const toLocalDate = (date) => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().split('T')[0];
  };

  const formik = useFormik({
    initialValues: {
      doctor_id: doctorId,
      patient_id: patientId,
      date: toLocalDate(selectedDate),
      time: '',
      details: '',
    },
    validationSchema: Yup.object({
      date: Yup.date().required('Date is required'),
      time: Yup.string().required('Time is required'),
      details: Yup.string().required('Details are required'),
    }),
    onSubmit: async (values) => {
      const selectedTime = new Date(`1970-01-01T${values.time}`);
      const doctorStart = new Date(`1970-01-01T${doctorStartTime}`);
      const doctorEndMinus15 = new Date(`1970-01-01T${doctorEndTime}`);
      doctorEndMinus15.setMinutes(doctorEndMinus15.getMinutes() - 15);

      if (selectedTime < doctorStart || selectedTime > doctorEndMinus15) {
        toast.warn('Please select a time within the doctor\'s working hours.');
        return;
      }
      try {
        const response = await addAppointment(values);
        console.log(response);
        toast.success('Appointment created successfully');
        handleCloseModal()
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error('Failed to create Appointment');
      }
    },
  });

  const handleTimeChange = (event) => {
    const time = event.target.value;
    formik.setFieldValue('time', time);
  };

  if (!doctorId || !patientId) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Appointment Form</h2>
          <button onClick={handleCloseModal} className="text-red-500 font-bold text-xl">&times;</button>
        </div>
        <form onSubmit={formik.handleSubmit} className="mt-4">
          {/* Calendar input */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Select Appointment Date
            </label>
            <Calendar
              onChange={(date) => {
                setSelectedDate(date);
                formik.setFieldValue('date', toLocalDate(date));
              }}
              value={selectedDate}
              tileDisabled={isDayDisabled}
            />
            {formik.touched.date && formik.errors.date ? (
              <div className="text-red-600 text-sm mt-1">{formik.errors.date}</div>
            ) : null}
          </div>

          {/* Time input */}
          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-medium text-gray-800">
              Select Appointment Time <span className='text-black font-bold'>{`from ${doctorStartTime} to ${doctorEndTime}`}</span>
            </label>
            <input
              type="time"
              id="time"
              name="time"
              className="mt-1 h-10 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              onChange={handleTimeChange}
              value={formik.values.time}
            />
            {formik.touched.time && formik.errors.time ? (
              <div className="text-red-600 text-sm mt-1">{formik.errors.time}</div>
            ) : null}
          </div>

          {/* Details text area */}
          <div className="mb-4">
            <label htmlFor="details" className="block text-sm font-medium text-gray-700">
              Appointment Details
            </label>
            <textarea
              id="details"
              name="details"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows="4"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
            ></textarea>
            {formik.touched.details && formik.errors.details ? (
              <div className="text-red-600 text-sm mt-1">{formik.errors.details}</div>
            ) : null}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="ml-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
