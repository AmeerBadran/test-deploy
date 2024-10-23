import { useFormik } from 'formik';

const SearchForm = () => {
  const formik = useFormik({
    initialValues: {
      city: '',
      specialty: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
        <option value="Ramallah" label="Ramallah" />
        <option value="Nablus" label="Nablus" />
        <option value="Jenin" label="Jenin" />
        <option value="Tulkarm" label="Tulkarm" />
        <option value="Salfit" label="Salfit" />
        <option value="Hebron" label="Hebron" />
        <option value="Bethlehem" label="Bethlehem" />
        <option value="Al-Bireh" label="Al-Bireh" />
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
        <option value="Orthodontist" label="Orthodontist" />
        <option value="Oral Pathologist" label="Oral Pathologist" />
        <option value="Cosmetic Dentist" label="Cosmetic Dentist" />
        <option value="Periodontist" label="Periodontist" />
        <option value="Endodontist" label="Endodontist" />
        <option value="Oral Surgeon" label="Oral Surgeon" />
        <option value="Pediatric Dentistry" label="Pediatric Dentistry" />
        <option value="Pediatric Dentist" label="Pediatric Dentist" />
      </select>

      <button type="submit" className="p-4 bg-sky-600 rounded-md text-white font-medium hover:bg-sky-700 transition-all duration-500">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
