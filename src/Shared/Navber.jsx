import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { IoMdLogIn } from 'react-icons/io';
import { RiLogoutCircleLine } from 'react-icons/ri';
import logo from '../assets/Icon.png';

const Navber = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
     
    </>
  );

  return (
    <div className="fixed z-10 w-full">
      <div className="navbar bg-opacity-30 bg-black container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-xl text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content text-white bg-gray-900 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
               <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            ` btn  bg-transparent border-none text-lg font-semibold ${
              isActive ? 'text-red-500 border-b-2 border-red-500' : 'text-white'
            }`
          }
          exact
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allProperty"
          className={({ isActive }) =>
            ` btn  bg-transparent border-none text-lg font-semibold ${
               isActive ? 'text-red-500 border-b-2 border-red-500' : 'text-white'
            }`
          }
        >
          All Properties
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashbroad"
          className={({ isActive }) =>
            `btn  bg-transparent border-none text-lg font-semibold ${
              isActive ? 'text-red-500 border-b-2 border-red-500' : 'text-white'
            }`
          }
        >
          Dashbroad
        </NavLink>
      </li>
      <li>
      <NavLink
          to="/about"
          className={({ isActive }) =>
            ` btn  bg-transparent border-none text-lg  font-semibold ${
              isActive ? 'text-red-500 border-b-2 border-red-500' : 'text-white'
            }`
          }
          exact
        >
          About Us
        </NavLink>
      </li>
            </ul>
          </div>
          <div className="flex gap-1">
            <a className="btn btn-ghost text-white font-bold text-xl">
              <img src={logo} className="w-8 h-8" alt="" /> HomeScape
            </a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg text-bold text-white">
            <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            ` btn  bg-transparent border-none text-lg  font-semibold ${
              isActive ? 'text-red-500 border-b-2 border-red-500' : 'text-white'
            }`
          }
          exact
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allProperty"
          className={({ isActive }) =>
            `btn  bg-transparent border-none text-lg font-semibold ${
               isActive ? 'text-red-500 border-b-2 border-red-500' : 'text-white'
            }`
          }
        >
          All Properties
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashbroad"
          className={({ isActive }) =>
            `btn  bg-transparent border-none text-lg font-semibold ${
              isActive ? 'text-red-500 border-b-2 border-red-500' : 'text-white'
            }`
          }
        >
          Dashbroad
        </NavLink>
      </li>
      <li>
      <NavLink
          to="/about"
          className={({ isActive }) =>
            ` btn  bg-transparent border-none text-lg  font-semibold ${
              isActive ? 'text-red-500 border-b-2 border-red-500' : 'text-white'
            }`
          }
          exact
        >
          About Us
        </NavLink>
      </li>
      
          </ul>
        </div>
        <div className="navbar-end gap-5 items-center ">
          {user ? (
            <>
              <div className="flex  items-center gap-3 hidden md:block">
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white font-semibold">{user.displayName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="btn text-black font-semibold text-lg hover:rounded-full"
              >
                <RiLogoutCircleLine className="text-lg" /> Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="btn text-black font-semibold text-lg hover:rounded-full"
            >
              <IoMdLogIn className="text-lg" /> Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;
