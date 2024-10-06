import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../organism/Navbar";
import Footer from "../organism/Footer"
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


export default function RootLayout() {

  return (
    <>
      <ScrollToTop />
      <div className="bg-[#FFF]">
        <Navbar />
        <Outlet />

        <Footer />
      </div>
    </>

  );
}
