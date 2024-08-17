import mainLogo from "../../assets/images/projectMainLogo.png";
import { IoMdPersonAdd, IoMdClose } from "react-icons/io";
import { IoLogIn } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import NavLinks from "../atoms/NavLink";
import AuthButton from "../atoms/AuthBotton";

function Navbar() {
  const [isHalfScreen, setIsHalfScreen] = useState(window.innerWidth > 950);
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsHalfScreen(window.innerWidth > 950);
      if (isHalfScreen !== window.innerWidth > 950) {
        setOpenNav(false);
      }
    };
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isHalfScreen]);

  const handleNavButton = () => {
    setOpenNav(!openNav);
    console.log('sdg')
  };

  return (
    <div className="bg-[#EFF8FF] border-b border-[#D8E5ED]">
      <header
        className={`max-w-[1300px] mx-auto flex items-center justify-between ${isHalfScreen ? "h-28" : "h-20"} px-4 relative`}>
        <img src={mainLogo} alt="Logo" className="w-52 min-w-40" />
        {isHalfScreen ? (
          <div className="flex w-full justify-between">
            <ul className="flex flex-1 gap-6 slg:gap-8 xl:gap-14 justify-center items-center p-4">
              <NavLinks linksLayout={"fullPage"} bgColor={'light'}/>

            </ul>
            <div className="flex gap-1">
              <AuthButton label="SignUp" icon={IoMdPersonAdd} roundedPosition="left" bgType="light" to={'signUp'} />
              <AuthButton label="LogIn" icon={IoLogIn} roundedPosition="right" bgType="light" to={'logIn'} />
            </div>
          </div>
        ) : (
          <button type="button" onClick={handleNavButton} className="flex justify-center items-center w-10 h-10 min-w-10 rounded-md bg-[#0E384C]">
            {!openNav ? <FaBars className="text-white text-2xl" /> : <IoMdClose className="text-white text-3xl" />}
          </button>
        )}
        <div
          className={`absolute bg-[#0E384C] right-2 left-2 z-50 rounded-md p-5 transition-all duration-300 ${openNav && !isHalfScreen ? "top-24 opacity-100" : "-top-96 opacity-0"}`}>
          <div className="flex flex-col w-full justify-between">
            <ul className="flex flex-col flex-1 gap-4 justify-start items-start w-full">
              <NavLinks linksLayout={"halfPage"} bgColor={'dark'} handleNavButton={handleNavButton}/>
            </ul>
            <div className="flex gap-1 mt-5 flex-col xmobile:flex-row">
              <AuthButton label="SignUp" icon={IoMdPersonAdd} roundedPosition="left" bgType="dark" to={'signUp'} />
              <AuthButton label="LogIn" icon={IoLogIn} roundedPosition="right" bgType="dark" to={'logIn'} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
