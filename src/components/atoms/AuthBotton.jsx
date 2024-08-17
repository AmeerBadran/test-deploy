import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const AuthButton = ({ label, icon: Icon, roundedPosition, bgType, onClick, to }) => {
  const roundedClass =
    roundedPosition === "left"
      ? "rounded-l-xl"
      : roundedPosition === "right"
        ? "rounded-r-xl"
        : "rounded-full py-3";
  const bgClass =
    bgType === "dark"
      ? "bg-[#FFF]"
      : bgType === "light"
        ? "bg-[#0E384C]"
        : "";

  const textColorClass =
    bgType === "dark"
      ? "text-[#FFF] hover:text-[#0E384C]"
      : bgType === "light"
        ? "text-white"
        : "";

  const buttonContent = (
    <>
      <div
        className={`absolute ${bgClass} w-0 h-full ${roundedClass} ${roundedPosition === "left" ? "right-0" : "left-0"
          } group-hover:w-full opacity-0 group-hover:opacity-100 transition-all duration-700`}
      ></div>
      <p className="z-10">{label}</p>
      <Icon className="w-5 h-5 min-w-5 min-h-5 z-10" />
    </>
  );

  if (label === "SignUp" || label === "LogIn" || label === "Back To Home Page") {
    return (
      <Link
        to={to}
        className={`group flex gap-5 items-center px-4 py-[10px] bg-[#1E84B5] ${textColorClass} font-semibold ${roundedClass} relative duration-300`}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={`group flex gap-5 items-center px-6 py-[10px] bg-[#1E84B5] ${textColorClass} font-semibold ${roundedClass} relative duration-300`}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
};

export default AuthButton;
