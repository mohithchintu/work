import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import { useAuth } from "../auth/AuthContext";
import { CgProfile } from "react-icons/cg";
import { IoLibrarySharp } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import classNames from "classnames";

const NavBar = () => {
  const { isAuthenticated, signout } = useAuth();
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navLinks = isAuthenticated
    ? [
        { to: "/home", label: "Home" },
        { to: "/library", label: "Library" },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/aboutus", label: "About" },
        { to: "/contact-us", label: "Contact" },
      ];

  return (
    <div className="flex border-b border-teal-500 px-5 h-24 items-center justify-between bg-teal-50 shadow-md">
      {isAuthenticated && (
        <div className="border border-teal-500 rounded-xl py-1 px-1 items-center bg-teal-50">
          <IoMdMenu size={28} />
        </div>
      )}
      <Link
        to={isAuthenticated ? "/home" : "/"}
        className="flex gap-5 items-center"
      >
        <IoLibrarySharp size={40} />
        <div className="text-2xl font-bold">Chintu Library</div>
      </Link>

      {!isAuthenticated && (
        <div className="space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={classNames(
                "font-semibold text-lg hover:text-gray-400",
                {
                  underline: pathname === link.to,
                }
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
      <div>
        {isAuthenticated ? (
          <div className="relative">
            <div className="p-1 rounded-xl border border-teal-500">
              <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-0.5">
                  <CgProfile size={36} />
                  <span>chintu</span>
                </div>
                <button
                  onClick={toggleDropdown}
                  className="p-0.5 bg-teal-100 border border-teal-500 rounded-md"
                >
                  <FaAngleDown />
                </button>
              </div>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-teal-500 rounded-md shadow-lg z-10">
                <button
                  onClick={() => {
                    toggleDropdown();
                    signout();
                    navigate("/");
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-5 border border-teal-500 rounded-full py-2 px-4 items-center bg-teal-100 shadow-md">
            <div className="px-2 py-1 items-center">
              <SignIn />
            </div>
            <Link
              to="/register"
              className="px-2 py-1 items-center font-semibold hover:text-gray-400"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
