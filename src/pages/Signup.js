import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:3333/api/signup', {
        username,
        email,
        password,
      });

      setMessage('Signed up successfully');
      setTimeout(() => navigate('/'), 2000); // Navigate to '/' after 2 seconds
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage(err.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-28">
        <div className="h-16"></div>
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Sign Up</h1>
      {message && <p className="mb-4 text-red-500">{message}</p>}
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
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
            Email
          </label>
          <input 
            className="w-full px-3 py-2 leading-tight text-white border rounded shadow appearance-none bg-gray-700 focus:outline-none focus:shadow-outline" 
            id="email" 
            type="email" 
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
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
            placeholder="*********"
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" 
            type="submit"
          >
            Sign Up
          </button>
          <Link to="/login" className="inline-block mt-4 text-sm font-bold text-blue-500 align-baseline hover:text-blue-800">
            Already have an account? Login!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
