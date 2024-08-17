/* eslint-disable react/prop-types */

const BookCard = ({ doctor }) => {
  return (
    <div
      data-aos="fade-right"
      className={`flex flex-col items-center ${doctor.bgColor
        } border border-gray-200 rounded-lg shadow md:flex-row w-full mb-4`}
    >
      <img
        className="object-cover w-full md:h-auto md:max-w-64 md:rounded-l-lg"
        src={doctor.image}
        alt={doctor.name}
      />
      <div className="flex flex-col justify-between p-4 leading-normal w-full md:w-3/4">
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
          {doctor.name}
        </h5>
        <p className="text-sm text-gray-700 dark:text-gray-400">
          {doctor.details} <br />
          Working hours: {doctor.workingHours}
        </p>
        <div className="p-3 bg-[#e3eef3] rounded mt-4 flex justify-between shadow-md">
          <span
            className={`text-base flex justify-center items-center font-medium me-2 px-2.5 py-0.5 rounded ${doctor.isOpen ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
              }`}
          >
            {doctor.isOpen ? "Open" : "Close"}
          </span>
          <button className="bg-[#0E4257] text-white py-2 px-4 rounded w-48 hover:bg-[#156484] transition-all duration-500">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;