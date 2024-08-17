import mainLogo from "../../assets/images/clinic-office-system-high-resolution-logo-transparent (1).png";
import NavLinks from "../atoms/NavLink";
import SocialLinks from "../molecule/SocialLinks";
export default function Footer() {
  return (
    <div>
      <footer className="bg-gradient-to-r from-[#0E384C] to-cyan-700 py-10">
        <div className="max-w-[1300px] mx-auto px-4 flex justify-between flex-col 2md:flex-row text-left">
          <div className="2md:w-3/5 mb-6 pr-12 md:mb-0">
            <img src={mainLogo} alt="Clinic Office System Logo" className="mb-4 max-w-64 w-auto" />
            <p className="text-gray-100">We care about your visit!</p>
            <p className="text-gray-100 mt-2">

              Book your appointment easily with our advanced clinic management system. We’re here to provide the best healthcare for you and your family. Don’t hesitate—schedule now and enjoy a premium healthcare experience!
            </p>
          </div>
          <div className="2md:w-1/5 mb-6 md:mb-0 mt-5">
            <h3 className="text-gray-800 font-semibold mb-3">Website Pages</h3>
            <ul className="flex flex-col flex-1 gap-4 justify-start items-start w-full">
              <NavLinks linksLayout={"halfPage"} bgColor={"dark"} />
            </ul>
          </div>
          <div className="2md:w-1/5 mb-6 md:mb-0 mt-5">
            <h3 className="text-gray-800 font-semibold mb-3">Social Media</h3>
            <SocialLinks />
          </div>
        </div>
        <div className="border-t border-gray-500 mt-6 pt-6 text-center">
          <p className="text-gray-100">Clinic Office System 2024 © All rights reserved.</p>
        </div>
      </footer>
    </div>

  )
}
