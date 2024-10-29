import heroImg from "../assets/images/hero-img.png"
import ReactLoading from 'react-loading'
import AuthButton from "../components/atoms/AuthBotton"
import { PiStarFourFill } from "react-icons/pi";
import { IoSearchSharp } from "react-icons/io5";
import { RiToothFill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useEffect, useState } from "react";
import SearchForm from "../components/molecule/SearchFrom";
import DoctorCard from "../components/molecule/DoctorCard"
import { getDoctors } from "../api/endpoints/doctors"
// ..
AOS.init();
export default function Home() {
  const [openSearch, setOpenSearch] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true)
        const respons = await getDoctors();
        setDoctors(respons.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false)
      }
    };

    fetchDoctors();
  }, []);



  const handleButtonClick = () => {
    setOpenSearch(!openSearch); // Toggle the openSearch state
  };

  return (
    <div className="bg-[#EFF8FF] ">
      <div className="flex flex-col max-w-[1300px] mx-auto justify-between items-center pt-10 px-[15px] lg:pt-[50px] slg:flex-row">
        <div className="w-full slg:w-1/2 border-b border-gray-500 pb-5 mb-5">
          <h1 data-aos="fade-right" data-aos-duration="1200" className="text-[56px] leading-tight font-black text-[#0E384C]">Experience <span className="text-[#1E84B5]">Dental Excellence</span> with a Gentle Touch</h1>
          <p data-aos="fade-up" data-aos-duration="1200" className=" text-[#5272A2] text-[18px] mt-10">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal</p>
          <div data-aos="fade-up" data-aos-duration="1500" className="mt-10 w-1/2 relative" >
            <FaUserDoctor data-aos="zoom-in-down" data-aos-delay="500" className={` absolute bg-[#0E384C] w-24 h-24 p-3 rounded-full text-[#FFF] shadow-xl hover:bg-[#FFF] hover:text-[#0E384C] -bottom-3 -right-32 2md:-right-40 slg:-right-44 lg:-right-56 xl:-right-80`} />
            <AuthButton label="Click here to find a doctor" icon={IoSearchSharp} roundedPosition="full" bgType="light" onClick={handleButtonClick} />
          </div>
          <div className={`${openSearch ? 'p-4' : 'h-0'} w-full bg-white mt-7 transition-all duration-500 ease-out rounded-md shadow-inner shadow-gray-300 overflow-hidden`}>
            <SearchForm setDoctors={setDoctors} />

          </div>
        </div>
        <div className=" relative mr-[100px]">
          <img src={heroImg} alt="heroImg" data-aos="zoom-out" data-aos-duration="2000" />
          <RiToothFill data-aos="zoom-in-right" data-aos-duration="1500" data-aos-delay="500" className=" absolute top-20 bg-white w-20 h-20 p-3 rounded-full text-[#0E384C] shadow-xl hover:bg-[#0E384C] hover:text-[#FFF]" />
          <PiStarFourFill data-aos="zoom-in-up" data-aos-duration="1700" data-aos-delay="700" className=" absolute top-72 -right-20 bg-[#0E384C] w-24 h-24 p-3 rounded-full text-[#FFF] shadow-xl hover:bg-[#FFF] hover:text-[#0E384C]" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#0E384C] to-cyan-700 w-full py-20 px-4">
        <div className="max-w-[1300px] mx-auto text-white flex flex-col mb-20 text-center">
          <p className="flex justify-center items-center gap-3 text-[#cce2ee]"><PiStarFourFill />OUR TEAM</p>
          <h1 className="my-7 text-6xl font-extrabold"><span className="text-[#9dcbdf]">Our Friendly</span> Dentists Team</h1>
          <p className="text-[#cce2ee]">We are committed to sustainability. eco-friendly initiatives.</p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ReactLoading type="spin" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="max-w-[1300px] mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-7">
            {doctors.map((doctor, index) => (
              <DoctorCard
                key={doctor._id}
                imageSrc={doctor.avatar}
                altText={`Doctor ${doctor.first_Name} ${doctor.last_Name}`}
                university={doctor.qualification}
                specialization={doctor.specialization}
                workTime={doctor.workTime}
                doctorName={`Dr. ${doctor.first_Name} ${doctor.last_Name}`}
                delay={index * 200}
                duration="1500"
                bookButton={false}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
