import DoctorCard from "../components/molecule/DoctorCard"
import PageHeader from "../components/molecule/PageHeader"
import PaginationRounded from "../components/molecule/PaginationRounded"
import BookCard from "../components/organism/BookCard";
import bookCardData from "../constants/BookCardData";
import { doctorsData } from "../constants/doctorData"

const delays = [0, 100, 200, 300];
const durations = [900, 1100, 1300, 1400];

export default function Doctors() {
  const handlePageChange = (page) => {
    console.log('Selected Page:', page);
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
          {doctorsData.map((doctor, index) => (
            <DoctorCard
              key={index}
              doctorName={doctor.name}
              imageSrc={doctor.imageSrc}
              altText={doctor.altText}
              university={doctor.university}
              specialization={doctor.specialization}
              clinicHoursStart={doctor.clinicHoursStart}
              clinicHoursEnd={doctor.clinicHoursEnd}
              delay={delays[index % 4]}
              duration={durations[index % 4]}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <PaginationRounded count={8} onPageChange={handlePageChange} theme='dark' />
        </div>
      </div>
      <div className="flex flex-col max-w-[1300px] mx-auto justify-between items-center pt-10 px-[15px] lg:pt-[50px] mb-20 mt-20 gap-10">
        <div data-aos="fade-up" data-aos-duration="1500" className="max-w-[1300px] mx-auto text-white flex flex-col mb-10 text-center">
          <h1 className="my-7 text-6xl font-extrabold text-[#1E84B5]"><span className="text-[#0E394D]">Book </span>with us</h1>
          <p className="text-[#1E84B5]">Book with the best doctors in the country.</p>
        </div>
        {bookCardData.map((doctor, index) => (
          <BookCard key={index} doctor={doctor} />
        ))}
        <div className="flex justify-center mt-4">
          <PaginationRounded count={8} onPageChange={handlePageChange} theme='light' />
        </div>
      </div>
    </div>


  )
}
