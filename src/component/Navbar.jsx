import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const navLinks = (
        <>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/services"}>Services</NavLink>
          </li>
          <li>
            <NavLink to={"/contact"}>Contact</NavLink>
          </li>
          <li>
            <NavLink to={"/terms"}>Terms</NavLink>
          </li>
        </>
        )
    return (
        <div className="navbar w-full mx-auto text-white ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost bg-orange-600 lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  z-[1] p-2 shadow bg-orange-600 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <a>
            <h2 className='font-semibold'>ESCORTS</h2>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex md:flex">
          <ul className="menu menu-horizontal px-5">{navLinks}</ul>
        </div>
        <div className="navbar-end ">
          
         <button className='btn-sm bg-success rounded-lg font-semibold text-white'>Login</button>
  
          
        </div>
      </div>
  
    );
};

export default Navbar;