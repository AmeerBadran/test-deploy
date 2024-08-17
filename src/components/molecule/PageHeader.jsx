/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const PageHeader = ({ title, breadcrumbText, bgClass, overlayColor, titleColor, breadcrumbColor, arrowColor, customTitleClasses }) => {
  return (
    <div className={`h-[450px] bg-cover bg-center ${bgClass} relative flex flex-col justify-center items-center gap-6 mb-20`}>
      <div className={`absolute w-full h-full ${overlayColor} opacity-60`}></div>
      <h1 data-aos="fade-left" data-aos-duration="1500" className={`${titleColor} ${customTitleClasses} z-10 font-black`}>{title}</h1>
      <div data-aos="fade-up" data-aos-duration="1500" className="flex z-10 mt-2" aria-label="Breadcrumb">
        <ul className="flex items-center space-x-2">
          <li className="inline-flex items-center">
            <Link to="/" className={`flex gap-2 items-center font-medium ${breadcrumbColor} hover:text-gray-300 transition-all duration-300`}>
              <FaHome />
              Home
            </Link>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <IoIosArrowForward className={arrowColor} />
              <span className={`ms-2 font-medium ${breadcrumbColor}`}>{breadcrumbText}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PageHeader;