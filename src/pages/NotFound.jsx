import PageHeader from "../components/molecule/PageHeader";
import NotFoundImgae from "../assets/images/404-error-img.png"
import AuthButton from "../components/atoms/AuthBotton";
import { FiArrowUpRight } from "react-icons/fi";
const NotFound = () => {
  return (
    <div className="bg-white">
      <PageHeader
        title="Page Not Found"
        breadcrumbText="404 Error"
        bgClass=""
        overlayColor="bg-[#EFF8FF]"
        titleColor="text-[#1e84b5]"
        breadcrumbColor="text-[#0E384C]"
        arrowColor="text-[#1e84b5]"
        customTitleClasses="text-5xl 2xmobile:text-7xl"
      />
      <div className=" max-w-[1300px] mx-auto py-24 pb-44 flex flex-col">
        <img src={NotFoundImgae} alt="Not Found Image 404" className="mx-auto" />
        <h1 data-aos="fade-up" className="mx-auto mt-12 text-5xl font-black text-[#0E384C]"><span className="text-[#1e84b5]">Oops!</span> Page Not Found</h1>
        <p data-aos="fade-up" className="mx-auto mt-8 mb-8 font-normal text-[#94afbb]">The page you are looking for does not exist</p>
        <div data-aos="fade-up" className="mx-auto">
          <AuthButton label="Back To Home Page" icon={FiArrowUpRight} roundedPosition="full" bgType="light" />
        </div>
      </div>

    </div>
  );
};

export default NotFound;