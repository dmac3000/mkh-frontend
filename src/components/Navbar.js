import React from 'react';
import logo from '../assets/mkh-logo.svg';
import '../App.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="navbar bg-white">
      <div className="flex-1">
        <Link to="/">
          <img 
            src={logo} 
            alt="mkh logo" 
            className="App-logo" 
          />
        </Link>
      </div>
      {/* Search Bar */}
      <div className="flex-none gap-2 mr-10">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
         </div>
      </div>
      {/* Navlinks */}
      <div className="flex">
        <ul className="menu menu-horizontal px-1">
          <li>
          <Link
              to="/myrecipes"
              className="text-2xl text-black italic font-bold font-sans mr-10 ml-3"
            >
              My Recipes
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-2xl text-black italic font-bold font-sans mr-16"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
