import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/mkh-logo.svg';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

export default function Navbar() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]); // Create a state variable for the search results
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const handleSearchChange = async (event) => {
    const newSearchTerm = event.target.value;
    setSearch(newSearchTerm);
  
    if (newSearchTerm) {
      try {
        const response = await axios.get(`http://localhost:3333/api/recipes/search?term=${newSearchTerm}`);
        setResults(response.data); // Store the search results in the state
        console.log(results) // log for debugging
        navigate('/search', { state: { results, term: search } }); // Pass the search term here
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Also remove the username
    setIsLoggedIn(false);
    setMessage('Logged out successfully'); // Set the message
    setTimeout(() => setMessage(''), 2000); // Clear the message after 2 seconds
    navigate('/');  // Navigate to home
  };


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
        <input 
          type="text" 
          placeholder="Search by name or effect" 
          className="input input-bordered bg-white text-black w-24 md:w-64"
          value={search} 
          onChange={handleSearchChange} 
        />
      </div>

      {/* div for all navbar links */}
      <div className="px-4 flex flex-col md:flex-row md:items-center md:justify-between alg">
        {/* Div for top row navbar links */}
        <div className="mt-4 md:mt-6">
          <div className="flex justify-end pb-10">
          {message && <p className="text-totk-green-light pr-4 font-bold text-sm">{message}</p>}
          {
            isLoggedIn 
            ? <button className="text-sm text-black italic font-bold font-sans mr-4 pr-8" onClick={logout}>Logout ({localStorage.getItem('username')})</button>
            : <Link to="/login" className="text-sm text-black italic font-bold font-sans mr-4 pr-8">Login</Link>
          }
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
              to="/my-recipes"
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
