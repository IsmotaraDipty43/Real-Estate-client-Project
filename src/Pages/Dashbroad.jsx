import React, { useEffect } from "react";
import { FaRegUser, FaHome, FaUsers, FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useLoadUserdata from "../Hooks/useLoadUserdata";
import { VscSymbolProperty } from "react-icons/vsc";
import { RiAdvertisementLine } from "react-icons/ri";
import { MdAdd, MdAddReaction } from "react-icons/md";
import { IoBagAdd } from "react-icons/io5";
import { IoIosCloudDone } from "react-icons/io";
import { BsFillQuestionSquareFill } from "react-icons/bs";

const Dashbroad = () => {
  const [isAdmin] = useAdmin();
  const { isAgent } = useLoadUserdata(); 

console.log(isAdmin);
 const navigate = useNavigate();
 useEffect(() => {
  if (isAdmin) {
    navigate("/dashbroad/profile");
  } else if (isAgent) {
    navigate("/dashbroad/agent-profile");
  } else {
    navigate("/dashbroad/my-profile");
  }
}, [isAdmin, isAgent, navigate]);
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Sidebar */}
        <nav className="w-full md:w-1/4 bg-gray-800 text-white font-bold text-lg p-5">
          <ul className="space-y-4">
            {/* Admin Routes */}
            {isAdmin ? (
              <>
                <li>
                  <NavLink
                    to="/dashbroad/profile"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 bg-gray-300 text-black rounded px-3 py-2"
                        : "flex items-center gap-2 hover:bg-gray-700 rounded px-3 py-2"
                    }
                  >
                    <FaRegUser /> Admin Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashbroad/manage-properties"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 bg-gray-300 text-black rounded px-3 py-2"
                        : "flex items-center gap-2 hover:bg-gray-700 rounded px-3 py-2"
                    }
                  >
                    <FaHome /> Manage Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashbroad/manage-users"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 bg-gray-300 text-black rounded px-3 py-2"
                        : "flex items-center gap-2 hover:bg-gray-700 rounded px-3 py-2"
                    }
                  >
                    <FaUsers /> Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashbroad/manage-reviews"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 bg-gray-300 text-black rounded px-3 py-2"
                        : "flex items-center gap-2 hover:bg-gray-700 rounded px-3 py-2"
                    }
                  >
                    <FaStar /> Manage Reviews
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashbroad/Advertiseproperty"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 bg-gray-300 text-black rounded px-3 py-2"
                        : "flex items-center gap-2 hover:bg-gray-700 rounded px-3 py-2"
                    }
                  >
                   <RiAdvertisementLine /> Advertise property
                  </NavLink>
                </li>

              </>
            ) : isAgent ? (
              // Agent Routes
              <>
                <li>
                  <NavLink
                    to="/dashbroad/agent-profile"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 bg-gray-300 text-black rounded px-3 py-2"
                        : "flex items-center gap-2 hover:bg-gray-700 rounded px-3 py-2"
                    }
                  >
                    <FaRegUser /> Agent Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashbroad/add-property"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 bg-gray-300 text-black rounded px-3 py-2"
                        : "flex items-center gap-2 hover:bg-gray-700 rounded px-3 py-2"
                    }
                  >
                 <MdAddReaction /> Add Property
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashbroad/my-properties"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 bg-gray-300 text-black rounded px-3 py-2"
                        : "flex items-center gap-2 hover:bg-gray-700 rounded px-3 py-2"
                    }
                  >
                  <IoBagAdd /> My Added Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashbroad/sold-properties"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 bg-gray-300 text-black rounded px-3 py-2"
                        : "flex items-center gap-2 hover:bg-gray-700 rounded px-3 py-2"
                    }
                  >
                 <IoIosCloudDone /> My Sold Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashbroad/requested-properties"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 bg-gray-300 text-black rounded px-3 py-2"
                        : "flex items-center gap-2 hover:bg-gray-700 rounded px-3 py-2"
                    }
                  >
                  <BsFillQuestionSquareFill />  Requested Properties
                  </NavLink>
                </li>
              </>
            ) : (
              // Regular User Routes
              <>
                <li>
                  <NavLink
                    to="/dashbroad/my-profile"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 bg-gray-300 text-black rounded px-3 py-2"
                        : "flex items-center gap-2 hover:bg-gray-700 rounded px-3 py-2"
                    }
                  >
                    <FaRegUser /> My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashbroad/wishlist"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 bg-gray-300 text-black rounded px-3 py-2"
                        : "flex items-center gap-2 hover:bg-gray-700 rounded px-3 py-2"
                    }
                  >
                    <FaHeart /> Wishlist
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashbroad/property-bought"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 bg-gray-300 text-black rounded px-3 py-2"
                        : "flex items-center gap-2 hover:bg-gray-700 rounded px-3 py-2"
                    }
                  >
                    <FaShoppingCart /> Property Bought
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashbroad/my-reviews"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 bg-gray-300 text-black rounded px-3 py-2"
                        : "flex items-center gap-2 hover:bg-gray-700 rounded px-3 py-2"
                    }
                  >
                    <FaStar /> My Reviews
                  </NavLink>
                </li>
              </>
            )}
                      <div className="divider divider-error"></div>

                      <li>
                  <NavLink
                    to="/" className='text-white font-bold text-lg flex items-center gap-2 px-3 py-2'
                  >
                  <FaHome /> Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/allProperty" className='text-white font-bold text-lg flex items-center gap-2 px-3 py-2'
                  >
                <VscSymbolProperty /> All Properties
                  </NavLink>
                </li>
          </ul>

        </nav>

        {/* Right Content */}
        <div className="w-full md:w-3/4 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashbroad;
