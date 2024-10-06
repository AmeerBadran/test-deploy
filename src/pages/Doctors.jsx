import { useEffect, useState } from "react";
import DoctorCard from "../components/molecule/DoctorCard"
import PageHeader from "../components/molecule/PageHeader"
import PaginationRounded from "../components/molecule/PaginationRounded"
import BookCard from "../components/organism/BookCard";
import { getDoctors2 } from "../api/endpoints/doctors";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    const fetchDoctors = async (pageNumber) => {
      try {
        const respons = await getDoctors2(pageNumber);
        setDoctors(respons.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors(pageNumber);
  }, [pageNumber]);
  const handlePageChange = (page) => {
    setPageNumber(page)
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
            workTime={doctor.workTime}
            doctorName={`Dr. ${doctor.first_Name} ${doctor.last_Name}`}
            delay={index * 200}
            duration="1500"
          />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <PaginationRounded count={2} onPageChange={handlePageChange} theme='dark' />
        </div>
      </div>
      <div className="flex flex-col max-w-[1300px] mx-auto justify-between items-center pt-10 px-[15px] lg:pt-[50px] mb-20 mt-20 gap-10">
        <div data-aos="fade-up" data-aos-duration="1500" className="max-w-[1300px] mx-auto text-white flex flex-col mb-10 text-center">
          <h1 className="my-7 text-6xl font-extrabold text-[#1E84B5]"><span className="text-[#0E394D]">Book </span>with us</h1>
          <p className="text-[#1E84B5]">Book with the best doctors in the country.</p>
        </div>
        {doctors.map((doctor) => (
          <BookCard key={doctor._id} doctor={doctor} />
        ))}
        <div className="flex justify-center mt-4">
          <PaginationRounded count={2} onPageChange={handlePageChange} theme='light' />
        </div>
      </div>
    </div>


  )
}
