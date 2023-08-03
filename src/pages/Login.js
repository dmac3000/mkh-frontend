import React, { useState, useContext } from 'react';  // Include useContext
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';  // Import AuthContext
import { useLocation } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  const { setIsLoggedIn } = useContext(AuthContext);  // Add this line

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { data } = await axios.post('http://localhost:3333/api/login', {
        username,
        password,
      });
  
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId); 
      localStorage.setItem('username', data.username);  // Add this line
      console.log('Stored token:', data.token);
      setMessage('Logged in successfully'); // Set success message
      setIsLoggedIn(true);  // Set the isLoggedIn state to true
  
      // Redirect to homepage after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 1000);
  
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);     
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <div className="h-10"></div>
      <div className="w-full max-w-sm px-5 py-4 mx-auto bg-black/70 rounded-2xl shadow-md">
        <h1 className="mb-6 text-4xl text-white">Login</h1>
        {error && <p className="mb-4 text-red-400">{error}</p>}
        {location.state?.message && <p className="mb-4 text-red-400">{location.state.message}</p>}
        {message && <p className="mb-4 text-totk-green-light">{message}</p>} {/* Display success message when present */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-white" htmlFor="username">
              Username
            </label>
            <input 
              className="w-full px-3 py-2 leading-tight text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
              id="username" 
              type="text" 
              placeholder="Username"
              onChange={e => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-white" htmlFor="password">
              Password
            </label>
            <input 
              className="w-full px-3 py-2 mb-3 leading-tight text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
              id="password" 
              type="password" 
              placeholder="********"
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button 
              className="px-4 py-2 font-bold text-white bg-totk-green-light rounded hover:bg-totk-green focus:outline-none focus:shadow-outline" 
              type="submit"
            >
              Login
            </button>
            <Link to="/signup" className="inline-block text-sm font-bold text-white align-baseline hover:text-totk-green-light">
              Don't have an account? Sign up!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
