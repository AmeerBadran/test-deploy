/* eslint-disable react/prop-types */
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LuPhoneCall } from "react-icons/lu";
import { CiTimer } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";

const icons = {
  HiOutlineLocationMarker,
  LuPhoneCall,
  CiTimer,
  MdOutlineMail,
};

export default function ContactCard({ icon, title, details }) {
  const IconComponent = icons[icon];
  return (
    <div data-aos="fade-up" data-aos-duration="1500" className="max-h-64 min-w-52 flex flex-col gap-6 bg-white p-4 rounded-3xl shadow-2xl shadow-[#9ca3af55] border border-slate-200 pl-7 pb-10 pt-6">
      <div className="bg-[#EFF8FF] w-14 h-14 rounded-full flex justify-center items-center">
        <IconComponent className="text-3xl text-blue-400" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold mb-2 mt-2 text-[#0E384C]">{title}</h3>
        {details.map((detail, index) => (
          <p key={index} className="text-gray-500">{detail}</p>
        ))}
      </div>
    </div>
  );
}