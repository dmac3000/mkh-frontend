import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/mkh-logo.svg";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (results.length > 0) {
      navigate("/search", { state: { results, term: search } });
    }
  }, [results, navigate, search]);

  const handleSearchChange = async (event) => {
    const newSearchTerm = event.target.value;
    setSearch(newSearchTerm);

    if (newSearchTerm) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/recipes/search?term=${encodeURIComponent(newSearchTerm)}`
        );
        setResults(response.data); // Store the search results in the state
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  };

  const logout = (event) => {
    event.stopPropagation(); // Added this line to stop logout closing dropdown menu
    localStorage.removeItem("token");
    localStorage.removeItem("username"); 
    setIsLoggedIn(false);
    setMessage("Logged out successfully"); 
    setTimeout(() => setMessage(""), 2000); // Clear the logged out message after 2 seconds
    navigate("/"); // Navigate to home
  };

  return (
    <div className="navbar bg-white">
      <div className="flex-1 ml-2">
        <Link to="/">
          <img src={logo} alt="mkh logo" className="App-logo" />
        </Link>
      </div>
      <div className="flex-none gap-2">
        {message && (
          <p className="text-center text-totk-green-light font-bold text-sm">
            {message}
          </p>
        )}
        <div className="form-control">
          <input
            type="text"
            placeholder="Search by name or effect"
            className="input input-bordered bg-white text-black w-24 lg:w-64"
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        <div className="dropdown dropdown-end ml-6">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar mr-4">
            <div className="w-12 h-12 rounded-full">
              <img src="/recipes.svg" alt="user" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white w-52 drop-shadow-2xl rounded-lg"
          >
            {isLoggedIn ? (
              <>
                <li>
                  <Link
                    to="/create-recipe"
                    className="text-base text-black italic font-bold font-sans"
                  >
                    Create Recipe
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-recipes"
                    className="text-base text-black italic font-bold font-sans mr-2"
                  >
                    View My Recipes
                  </Link>
                </li>
              </>
            ) : (
              <li className="text-black text-base">
                Please log in to view and create recipes.
              </li>
            )}
            {message && (
              <li>
                <p className="text-totk-green-light pr-4 font-bold text-sm">
                  {message}
                </p>
              </li>
            )}
          </ul>
        </div>
        <div className="dropdown dropdown-end lg:mr-4">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar lg:mr-4"
          >
            <div className="w-12 h-12 rounded-full">
              <img src="/user.svg" alt="user" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 bg-white shadow menu menu-sm dropdown-content w-52 drop-shadow-2xl rounded-lg"
          >
            {isLoggedIn ? (
              <li>
                <button
                  className="text-base text-black italic font-bold font-sans"
                  onClick={logout}
                >
                  Logout ({localStorage.getItem("username")})
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-base text-black italic font-bold font-sans"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="text-base text-black italic font-bold font-sans mr-2"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
            {message && (
              <li>
                <p className="text-totk-green-light pr-4 font-bold text-sm">
                  {message}
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

