import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SearchBox from "./Search/SearchBox";

const Header = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="w-full flex px-10 py-3 items-center bg-[#192F59] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* left: logo area (fills navbar height and a fixed width before the search box) */}
          <div className="flex items-center flex-none h-20 w-72">
            <Link to="/" className="h-full flex items-center">
              <img className="h-full w-auto object-contain" src="/Logo.jpg" alt="Logo" />
            </Link>
          </div>

          {/* center: search */}
          <div className="flex-1 mx-6">
            <SearchBox />
          </div>

          {/* right: nav links (desktop) */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-bold border-b-2 border-yellow-400 px-2 pb-1"
                  : "text-white hover:text-yellow-300 px-2 pb-1 transition-all"
              }
              style={{ textDecoration: "none" }}
            >
              Home
            </NavLink>
            <NavLink
              to="/Guide"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-bold border-b-2 border-yellow-400 px-2 pb-1"
                  : "text-white hover:text-yellow-300 px-2 pb-1 transition-all"
              }
              style={{ textDecoration: "none" }}
            >
              Guide
            </NavLink>
            <NavLink
              to="/FAQ"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-bold border-b-2 border-yellow-400 px-2 pb-1"
                  : "text-white hover:text-yellow-300 px-2 pb-1 transition-all"
              }
              style={{ textDecoration: "none" }}
            >
              FAQs
            </NavLink>
            {/* CTA removed */}
          </nav>
        </div>
        {width < 768 && (
          <div className="py-3">
            <div className="block md:hidden">
              {/* mobile title removed as requested */}
              <div className="mt-2">
                <SearchBox />
              </div>
              <div className="mt-3 flex gap-4">
                <Link to="/" className="text-white hover:text-yellow-300 px-2">Home</Link>
                <Link to="/Guide" className="text-white hover:text-yellow-300 px-2">Guide</Link>
                <Link to="/FAQ" className="text-white hover:text-yellow-300 px-2">FAQs</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
