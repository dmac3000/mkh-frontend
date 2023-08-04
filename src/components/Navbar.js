import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/mkh-logo.svg';
// import user from '/user.svg'
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
  const [isOpen, setIsOpen] = useState(false);
  
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
    <div className="navbar bg-white">
      <div className="flex-1">
        <Link to="/">
          <img src={logo} alt="mkh logo" className="App-logo" />
        </Link>
      </div>
      <div className="flex-none gap-2">
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
            <div className="w-10 rounded-full">
              <img src="/recipes.svg" alt= 'user' />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white w-52 drop-shadow-2xl rounded-lg">
            {isLoggedIn ?
              <>
                <li>
                  <Link to="/create-recipe" className="text-base text-black italic font-bold font-sans pr-10">
                    Create Recipe
                  </Link>
                </li>
                <li>
                  <Link to="/my-recipes" className="text-base text-black italic font-bold font-sans mr-2">
                    View My Recipes
                  </Link>
                </li>
              </>
              : 
              <li className='text-black text-base'>
                Please log in to view and create recipes.
              </li>
            }
          </ul>
        </div>
        <div className="dropdown dropdown-end mr-4">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar mr-4">
            <div className="w-10 rounded-full">
              <img src="/user.svg" alt= 'user'/>
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 bg-white shadow menu menu-sm dropdown-content w-52 drop-shadow-2xl rounded-lg">
            {isLoggedIn 
              ? <li><button className="text-base text-black italic font-bold font-sans mr-4 pr-8" onClick={logout}>Logout ({localStorage.getItem('username')})</button></li>
              : <>
                  <li><Link to="/login" className="text-xl text-black italic font-bold font-sans mr-4 pr-8">Login</Link></li>
                  <li>
                    <Link to="/signup" className="text-xl text-black italic font-bold font-sans mr-2">
                      Sign Up
                    </Link>
                  </li>
                </>
            }
          </ul>
        </div>
      </div>
    </div>
  );
}
//     <div className="navbar bg-white relative">
//       <Link to="/">
//         <img src={logo} alt="mkh logo" className="App-logo" />
//       </Link>
//       <button onClick={() => setIsOpen(!isOpen)} className="btn btn-ghost lg:hidden absolute top-0 right-0 p-6">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//       </button>
//       <div className={`dropdown absolute top-0 right-0 mt-12 ${isOpen ? 'block' : 'hidden'} lg:hidden z-50`}>
//         <ul tabIndex={0} className={`menu menu-sm dropdown-content z-[1] p-2 shadow bg-white rounded-box w-52`}>
//           <li>
//             <Link to="/create-recipe" className="text-2xl text-black italic font-bold font-sans pr-10">
//               Create Recipe
//             </Link>
//           </li>
          // <li>
          //   <Link to="/my-recipes" className="text-2xl text-black italic font-bold font-sans mr-2">
          //     My Recipes
          //   </Link>
          // </li>
//           {message && <li><p className="text-totk-green-light pr-4 font-bold text-sm">{message}</p></li>}
//           {isLoggedIn 
//             ? <li><button className="text-sm text-black italic font-bold font-sans mr-4 pr-8" onClick={logout}>Logout ({localStorage.getItem('username')})</button></li>
//             : <li><Link to="/login" className="text-sm text-black italic font-bold font-sans mr-4 pr-8">Login</Link></li>
//           }
//           <li>
//             <Link to="/signup" className="text-sm text-black italic font-bold font-sans mr-2">
//               Sign Up
//             </Link>
//           </li>
//         </ul>
//       </div>
  
//       <div className="navbar-end hidden lg:flex items-center">
//         <div className="form-control mr-4 lg:items-center pt-20">
//           <input 
//             type="text" 
//             placeholder="Search by name or effect" 
//             className="input input-bordered bg-white text-black w-24 lg:w-64"
//             value={search} 
//             onChange={handleSearchChange} 
//           />
//         </div>
  
//         <ul className="menu menu-horizontal px-1">
//           <li>
//             <Link to="/create-recipe" className="text-2xl text-black italic font-bold font-sans pr-10">
//               Create Recipe
//             </Link>
//           </li>
//           <li>
//             <Link to="/my-recipes" className="text-2xl text-black italic font-bold font-sans mr-2">
//               My Recipes
//             </Link>
//           </li>
//           {message && <li><p className="text-totk-green-light pr-4 font-bold text-sm">{message}</p></li>}
//           {isLoggedIn 
//             ? <li><button className="text-sm text-black italic font-bold font-sans mr-4 pr-8" onClick={logout}>Logout ({localStorage.getItem('username')})</button></li>
//             : <li><Link to="/login" className="text-sm text-black italic font-bold font-sans mr-4 pr-8">Login</Link></li>
//           }
//           <li>
//             <Link to="/signup" className="text-sm text-black italic font-bold font-sans mr-2">
//               Sign Up
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
  
// }  