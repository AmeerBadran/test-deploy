import { Outlet } from "react-router-dom";
import Navbar from "../organism/Navbar";
import Footer from "../organism/Footer"
export default function RootLayout() {

  return (
    <div className="bg-[#FFF]">
      <Navbar />
      <Outlet />

      <Footer />
    </div>
  );
}
