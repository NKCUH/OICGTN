import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full flex px-4 py-3 items-center bg-[#335fb1] shadow-lg">
      {/* Logo – left */}
      <div className="flex items-center flex-none h-16 w-36 sm:w-48">
        <Link to="/" className="h-full flex items-center">
          <img
            className="h-full w-auto object-contain"
            src="/logo.png"
            alt="Logo"
          />
        </Link>
      </div>

      {/* Centred title */}
      <div className="flex-1 text-center px-2">
        <h1 className="text-white font-extrabold text-sm sm:text-base md:text-xl lg:text-2xl leading-tight">
          Online Indian Citation Generation Tool
        </h1>
      </div>

      {/* Spacer to balance logo and keep title visually centred */}
      <div className="flex-none w-36 sm:w-48" />
    </div>
  );
};

export default Header;
