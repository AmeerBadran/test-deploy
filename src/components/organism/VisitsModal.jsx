import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { updateVisit, deleteVisit } from '../../api/endpoints/doctorsPage';
import { FaRegEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';

// eslint-disable-next-line react/prop-types
const VisitsModal = ({ isOpen, onClose, initialRecords = [], medicationId, appType }) => {
  const [records, setRecords] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const fundeleteVisit = async (visitId) => {
    try {
      const response = await deleteVisit(medicationId, visitId);
      toast.success(response.data.message);

      setRecords(records.filter(record => record._id !== visitId));
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete record.');
    }
  };
  useEffect(() => {
    setRecords(initialRecords);
  }, [initialRecords]);
  const validationSchema = Yup.object({
    cash: Yup.number().required('Cash is required').min(0, 'Cash must be positive'),
    date: Yup.date().required('Date is required'),
    note: Yup.string().required('Note is required'),
    description: Yup.string().required('Description is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const newRecord = {
        ...values,
        date: new Date(values.date).toISOString().split('T')[0], // Normalize date format to "YYYY-MM-DD"
      };

      await updateVisit(medicationId, newRecord);
      toast.success('Record updated successfully!');

      const updatedRecords = [...records];
      updatedRecords[editingIndex] = newRecord;
      setRecords(updatedRecords);

      setEditingIndex(null);
      onClose();
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Failed to update record.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 max-w-screen">
      <div className="bg-white rounded-lg shadow-lg max-w-[1300px] m-8 w-full max-h-[90vh] relative">
        <h2 className="text-2xl font-semibold text-center my-6">Records</h2>
        <div className='overflow-y-auto max-h-[80vh] p-8'>
          {records.map((record, index) => (
            <Formik
              key={record.id || index}
              initialValues={{
                ...record,
                date: record.date?.split('T')[0] || '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form className="grid grid-cols-1 md:grid-cols-3 items-start gap-6 mb-8 border-b">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
                    <div className="mb-4 lg:col-span-2">
                      <label className="block text-gray-700">Note</label>
                      <Field
                        type="text"
                        name="note"
                        className="w-full px-3 py-2 border rounded"
                        disabled={editingIndex !== index}
                      />
                      <ErrorMessage name="note" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Cash</label>
                      <Field
                        type="number"
                        name="cash"
                        className="w-full px-3 py-2 border rounded"
                        disabled={editingIndex !== index}
                      />
                      <ErrorMessage name="cash" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Date</label>
                      <Field
                        type="date"
                        name="date"
                        className="w-full px-3 py-2 border rounded"
                        disabled={editingIndex !== index}
                      />
                      <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>
                  <div className="mb-4 md:col-span-2 md:flex gap-6">
                    <div className="mb-4 w-full">
                      <label className="block text-gray-700">Description</label>
                      <Field
                        as="textarea"
                        name="description"
                        className="w-full px-3 py-2 border rounded"
                        rows="5"
                        disabled={editingIndex !== index}
                      />
                      <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                    </div>
                    {appType === 'doctor' &&
                      <div className="flex flex-col justify-center gap-5 items-center">
                        <div className='flex gap-2 w-full'>
                          <button
                            type="button"
                            className="bg-blue-500 flex  w-full md:w-auto hover:bg-blue-600 items-center gap-2 text-white px-4 py-2 rounded"
                            onClick={() => setEditingIndex(index)}
                          >
                            <FaRegEdit />
                          </button>
                          <button
                            type="button"
                            className="bg-red-500 flex w-full md:w-auto hover:bg-red-600 items-center gap-2 text-white px-4 py-2 rounded"
                            onClick={() => fundeleteVisit(record._id)}
                          >
                            <MdDelete />
                          </button>
                        </div>
                        <button
                          type="submit"
                          className="bg-green-500 w-full hover:bg-green-600 text-white px-4 py-2 rounded"
                          disabled={isSubmitting || editingIndex !== index}
                        >
                          {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                      </div>
                    }
                  </div>
                </Form>
              )}
            </Formik>
          ))}
        </div>
        <button
          type="button"
          className="bg-red-400 hover:bg-gray-500 text-white px-4 py-2 rounded mt-4 absolute top-2 right-5"
          onClick={() => {
            onClose();
            setEditingIndex(null);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default VisitsModal;
