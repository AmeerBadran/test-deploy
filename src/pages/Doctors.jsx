import { useEffect, useState } from "react";
import DoctorCard from "../components/molecule/DoctorCard"
import PageHeader from "../components/molecule/PageHeader"
import PaginationRounded from "../components/molecule/PaginationRounded"
import { getDoctors2, getDoctorsCount } from "../api/endpoints/doctors";
import AppointmentModal from "../components/organism/AppointmentModal";

export default function Doctors() {

  const [doctors, setDoctors] = useState([]);
  const [pageNumber, setPageNumber] = useState(1)
  const [doctorCount, setDoctorCount] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDoctorDays, setSelectedDoctorDays] = useState(null);

  useEffect(() => {
    const fetchDoctors = async (pageNumber) => {
      try {
        const respons = await getDoctors2(pageNumber);
        const respons2 = await getDoctorsCount();
        setDoctors(respons.data);
        setDoctorCount(Math.ceil(respons2.data.count / 8))
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors(pageNumber);
  }, [pageNumber]);

  const handlePageChange = (page) => {
    setPageNumber(page)
  };

  const handleOpenModal = (doctor, days) => {
    setSelectedDoctor(doctor);
    setSelectedDoctorDays(days)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#FFFFFF]">
      <PageHeader
        title="Our Team"
        breadcrumbText="Doctors"
        bgClass=""
        overlayColor="bg-[#EFF8FF]"
        titleColor="text-[#1e84b5]"
        breadcrumbColor="text-[#0E384C]"
        arrowColor="text-[#1e84b5]"
        customTitleClasses="text-5xl 2xmobile:text-7xl"
      />
      <div className="bg-gradient-to-r from-[#0E384C] to-cyan-700 w-full py-20 px-4 -mt-20">
        <div data-aos="fade-up" data-aos-duration="1500" className="max-w-[1300px] mx-auto text-white flex flex-col mb-20 text-center">
          <h1 className="my-7 text-6xl font-extrabold"><span className="text-[#9dcbdf]">Our Friendly</span> Dentists Team</h1>
          <h2 className="my-7 text-3xl font-extrabold"><span className="text-[#9dcbdf]">Book</span> with us</h2>
          <p className="text-[#cce2ee]">We are committed to sustainability. eco-friendly initiatives.</p>
        </div>
        <div className="max-w-[1300px] mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-7 gap-y-20">
          {doctors.map((doctor, index) => (
            <DoctorCard
              key={doctor._id}
              imageSrc={doctor.avatar}
              altText={`Doctor ${doctor.first_Name} ${doctor.last_Name}`}
              university={doctor.qualification}
              specialization={doctor.specialization}
              startTime={doctor.StartTime}
              endTime={doctor.EndTime}
              daysWork={doctor.DaysWork}
              doctorName={`Dr. ${doctor.first_Name} ${doctor.last_Name}`}
              delay={index * 200}
              duration="1500"
              onButtonClick={() => handleOpenModal(doctor._id, doctor.DaysWork)}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <PaginationRounded count={doctorCount} onPageChange={handlePageChange} theme='dark' />
        </div>
      </div>
      {isModalOpen && <AppointmentModal doctorId={selectedDoctor} handleCloseModal={handleCloseModal} daysWork={selectedDoctorDays} doctorStartTime={"09:00"} doctorEndTime={"17:00"} />}
    </div>
  )
}
