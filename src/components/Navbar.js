import React from 'react';
import logo from '../assets/mkh-logo.svg';
import '../App.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    // Logo
    <div className="navbar bg-white justify-between md:items-start">
      <Link to="/">
            <img 
              src={logo} 
              alt="mkh logo" 
              className="App-logo" 
            />
          </Link>

      {/* search bar */}
      <div className="form-control mr-4 md:items-center pt-20">
        <input type="text" placeholder="Search by name or effect" className="input input-bordered bg-white text-black w-24 md:w-64" />
      </div>

      {/* div for all navbar links */}
      <div className="px-4 flex flex-col md:flex-row md:items-center md:justify-between alg">
        {/* Div for top row navbar links */}
        <div className="mt-4 md:mt-6">
          <div className="flex justify-end pb-10">
            <Link
              to="/login"
              className="text-sm text-black italic font-bold font-sans mr-4 pr-8"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm text-black italic font-bold font-sans mr-2"
            >
              Sign Up
            </Link>
          </div>
          {/* Div for bottom row navbar links */}
          <div className="mt-2 flex justify-end">
            
            <Link
              to="/create-recipe"
              className="text-2xl text-black italic font-bold font-sans pr-10"
            >
              Create Recipe
            </Link>
            <Link
              to="/myrecipes"
              className="text-2xl text-black italic font-bold font-sans mr-2"
            >
              My Recipes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
