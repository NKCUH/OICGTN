import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Guides", to: "/Guide" },
  { label: "Tutorials", to: "/tutorials" },
  { label: "FAQs", to: "/FAQ" },
  { label: "Contact Us", to: "/contact" },
];

const Menubar = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-400 font-bold border-b-2 border-yellow-400 px-3 py-1 transition-all"
      : "text-white hover:text-yellow-300 px-3 py-1 transition-all";

  return (
    <nav className="w-full sticky top-0 z-50 bg-[#0f1f42] shadow-md">
      {/* Desktop */}
      <div className="hidden md:flex justify-center items-center gap-6 py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={linkClass}
            style={{ textDecoration: "none" }}
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Mobile hamburger */}
      <div className="flex md:hidden items-center justify-between px-4 py-2">
        <span className="text-white text-sm font-semibold">Menu</span>
        <button
          onClick={() => setOpen((o) => !o)}
          className="text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col items-start gap-1 px-4 pb-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={linkClass}
              style={{ textDecoration: "none" }}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Menubar;
