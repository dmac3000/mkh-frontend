import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { data } = await axios.post('http://localhost:3333/api/login', {
        username,
        password,
      });
  
      localStorage.setItem('token', data.token);
      setMessage('Logged in successfully'); // Set success message

      // Redirect to homepage after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);     
      } else {
        setError(err.message);
      }
    }
  };


    return (
  <div className="flex flex-col items-center justify-start mt-20 min-h-screen bg-gray-100">
    <h1 className="mb-6 text-3xl font-bold text-gray-900">Login</h1>
    {error && <p className="mb-4 text-red-500">{error}</p>}
    {message && <p className="mb-4 text-green-500">{message}</p>} {/* Display success message when present */}
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
          Username
        </label>
        <input 
          className="w-full px-3 py-2 leading-tight text-white border rounded shadow appearance-none bg-gray-700 focus:outline-none focus:shadow-outline" 
          id="username" 
          type="text" 
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
          required 
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
          Password
        </label>
        <input 
          className="w-full px-3 py-2 mb-3 leading-tight text-white border rounded shadow appearance-none bg-gray-700 focus:outline-none focus:shadow-outline" 
          id="password" 
          type="password" 
          placeholder="******************"
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button 
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" 
          type="submit"
        >
          Login
        </button>
        <Link to="/signup" className="inline-block mt-4 text-sm font-bold text-blue-500 align-baseline hover:text-blue-800">
          Don't have an account? Sign up!
        </Link>
      </div>
    </form>
  </div>
);
}
export default Login;