/* eslint-disable react/prop-types */
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { addRecord } from '../../api/endpoints/doctorsPage';

const MedicationModal = ({ isOpen, onClose, medicationId }) => {
  const initialValues = {
    cash: '',
    date: '',
    note: '',
    description: '',
  };

  const validationSchema = Yup.object({
    cash: Yup.number().required('Cash is required').min(0, 'Cash must be positive'),
    date: Yup.date().required('Date is required'),
    note: Yup.string().required('Note is required'),
    description: Yup.string().required('Description is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await addRecord(medicationId,values);  // Correctly calls addRecord

      toast.success('Medication updated successfully!');
      resetForm();
      onClose(); // Close modal on success
    } catch (error) {
      toast.error('Failed to update medication.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null; // Don't render the modal if it's closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Add Medication</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700">Cash</label>
                <Field
                  type="number"
                  name="cash"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage name="cash" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <Field
                  type="date"
                  name="date"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Note</label>
                <Field
                  type="text"
                  name="note"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage name="note" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  className="w-full px-3 py-2 border rounded"
                  rows="4"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={onClose}
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Add...' : 'Add Medication'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MedicationModal;
