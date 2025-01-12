import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, NavLink, Link, useNavigate, Navigate } from "react-router-dom";
import icon from "../../assets/icon.png";
import { IoStorefront } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

import * as actionType from "../../constants/actionTypes";
import { subscriptionInitialState } from "../../reducers/subscription";

const SellerManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [seller, setSeller] = useState(
    JSON.parse(localStorage.getItem("seller_profile"))
  );

  const gallery = seller.result.gallery_name;

  const myActive =
    "text-white bg-gray-600 w-full h-full flex items-center justify-center font-bold";

  function highlight({ isActive }) {
    return isActive ? `list-group-item ${myActive}` : "list-group-item";
  }

  const s_logout = () => {
    dispatch({
      type: actionType.UPDATE_SUBS_INFO,
      payload: subscriptionInitialState,
    });
    dispatch({ type: actionType.S_LOGOUT });

    navigate("/");

    setSeller(null);
  };

  if (!seller || !Object.keys(seller.result).length) {
    alert("Unauthorized access !!!");
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="flex">
        {/* side bar */}
        <div className="w-1/4 h-screen p-4">
          <Link to="/">
            <img src={icon} alt="icon" className="h-16 mt-10 mx-auto" />
          </Link>
          <ul className="mt-10">
            <li className="h-12 w-full flex border border-gray-600 items-center justify-center">
              <NavLink to="/sellerCenter/dashboard" className={highlight}>
                DASHBOARD
              </NavLink>
            </li>
            <li className="h-12 w-full flex border border-gray-600 items-center justify-center">
              <NavLink to="/sellerCenter/addartwork" className={highlight}>
                ADD AN ARTWORK
              </NavLink>
            </li>
            <li className="h-12 w-full flex border border-gray-600 items-center justify-center">
              <NavLink to="/sellerCenter/generalInfo" className={highlight}>
                GENERAL INFORMATION
              </NavLink>
            </li>
            <li className="h-12 w-full flex border border-gray-600 items-center justify-center">
              <NavLink to="/sellerCenter/articles" className={highlight}>
                SUBSCRIPTIONS
              </NavLink>
            </li>
            <li className="h-12 w-full flex border border-gray-600 items-center justify-center">
              <NavLink to="/sellerCenter/delete" className={highlight}>
                DELETE ACCOUNT
              </NavLink>
            </li>
          </ul>
          <div className="flex justify-center" onClick={s_logout}>
            <CiLogout className="absolute bottom-4 h-8 w-8 rounded-l hover:bg-gray-200" />
          </div>
        </div>
        {/* display area */}
        <div className="w-3/4 h-screen bg-white">
          <div className="flex w-full h-20">
            <p className="flex justify-center items-center w-3/4 text-xl font-bold">
              Seller Management Center
              <IoStorefront className="ml-3" />
            </p>
            <p className="flex justify-center items-center  text-gray-500 text-sm w-1/4">
              Welcome,<span className=" text-black ml-2">{gallery}</span>
            </p>
          </div>
          <div className="h-full mr-10 rounded-xl bg-gray-100 pt-10 px-16">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerManagement;
