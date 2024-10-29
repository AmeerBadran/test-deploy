import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { doctorsSearch, searchValues as fetchSearchValues } from '../../api/endpoints/doctors';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
const SearchForm = ({ setDoctors }) => {
  const [searchValues, setSearchValues] = useState({ cities: [], specializations: [] });

  useEffect(() => {
    const getSearchValues = async () => {
      try {
        const response = await fetchSearchValues();
        console.log(response.data);
        setSearchValues(response.data);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error('Server error 500');
      }
    };

    getSearchValues();
  }, []);

  const formik = useFormik({
    initialValues: {
      city: '',
      specialty: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await doctorsSearch(values)
        console.log(response)
        setDoctors(response.data)
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        console.log(values)
        toast.error('Not Found')
      }
    },
  });

  return (
    <form className="grid grid-cols-1 md:grid-cols-5 slg:grid-cols-1 xl:grid-cols-5 gap-3" onSubmit={formik.handleSubmit}>
      <select
        id="cities"
        name="city"
        className="bg-gray-50 border border-gray-300 text-gray-600 rounded-lg block w-full p-2 col-span-2"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.city}
      >
        <option value="" label="Choose City" />
        {searchValues.cities.map((city, index) => (
          <option key={index} value={city} label={city} />
        ))}
      </select>

      <select
        id="dental-specialties"
        name="specialty"
        className="bg-gray-50 border border-gray-300 text-gray-600 rounded-lg block w-full p-2 col-span-2"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.specialty}
      >
        <option value="" label="Choose Dental Specialty" />
        {searchValues.specializations.map((specialty, index) => (
          <option key={index} value={specialty} label={specialty} />
        ))}
      </select>

      <button type="submit" className="p-4 bg-sky-600 rounded-md text-white font-medium hover:bg-sky-700 transition-all duration-500">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
