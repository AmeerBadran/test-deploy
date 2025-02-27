import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
/* eslint-disable react/prop-types */
const DoctorCard = ({
  imageSrc,
  altText,
  city,
  specialization,
  startTime,
  endTime,
  doctorName,
  delay,
  duration,
  onButtonClick,
  bookButton
}) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration={duration}
      data-aos-delay={delay}
      className="min-w-[200px] w-auto min-h-[490px] h-auto flex flex-col justify-self-center"
    >
      <div className="h-5/6 relative group overflow-hidden rounded-3xl drop-shadow-lg shadow-white flex-1">
        <img
          className="h-full object-cover transition-all duration-1000 rounded-3xl cursor-pointer scale-110 group-hover:scale-100"
          src={`https://cos-server-4i2w.onrender.com/uploads/avatar/${imageSrc}`}
          alt={altText}
        />
        <div className="absolute origin-bottom-left flex flex-col gap-3 justify-center bottom-0 bg-[#EFF8FFDD] rounded-t-3xl px-4 z-10 h-0 w-full group-hover:h-full transition-all duration-500 text-gray-900 group-hover:py-4 overflow-hidden">
          <p className="text-gray-600 text-sm 2xmobile:text-2xl lg:text-base xl:text-lg font-medium transition-all duration-500">
            Location <span className="font-semibold">{city}</span>
          </p>
          <p className="text-sm 2xmobile:text-2xl lg:text-base xl:text-lg opacity-0 group-hover:opacity-100 transition-all duration-500">
            Specialized in <span className="font-semibold">{specialization}</span>
          </p>
          <p className="text-sm 2xmobile:text-2xl lg:text-base xl:text-lg opacity-0 group-hover:opacity-100 transition-all duration-500">
            Start Time: <span className="font-semibold">{startTime}</span>
          </p>
          <p className="text-sm 2xmobile:text-2xl lg:text-base xl:text-lg opacity-0 group-hover:opacity-100 transition-all duration-500">
            End Time: <span className="font-semibold">{endTime}</span>
          </p>
          {bookButton ? <div className='group/button w-3/5 mx-auto mt-24'>
            <button type='button' onClick={onButtonClick} className='group/button border-4 border-[#0E384C] rounded text-xl text-[#0E384C] w-full font-bold  relative overflow-hidden'>
              <div className='bg-[#0E384C] w-0 h-full group-hover/button:w-full absolute transition-all duration-300'></div>
              <p className='relative m-2 transition-all duration-300 group-hover/button:text-white z-10'>Book now</p>
            </button>
          </div> : <></>}

        </div>
      </div>
      <div className="text-center my-3">
        <h1 className="text-lg 2xmobile:text-2xl  text-gray-100 font-semibold">
          {doctorName}
        </h1>
      </div>
    </div>

  );
};

export default DoctorCard;