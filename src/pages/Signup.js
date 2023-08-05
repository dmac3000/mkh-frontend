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
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
        username,
        email,
        password,
      });
      console.log (data);
      setMessage('Signed up successfully');
      setTimeout(() => navigate('/login'), 2000); // Navigate to '/login' after 2 seconds
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage(err.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <div className="h-10"></div>
      <div className="w-full max-w-sm px-5 py-4 mx-auto bg-black/70 rounded-2xl shadow-md">
        <h1 className="mb-6 text-4xl text-white">Sign Up</h1>
        {message && <p className="mb-4 text-totk-green-light">{message}</p>}
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
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-white" htmlFor="email">
              Email
            </label>
            <input 
              className="w-full px-3 py-2 leading-tight text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
              id="email" 
              type="email" 
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
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
              placeholder="*********"
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button 
              className="px-4 py-2 font-bold text-white bg-totk-green-light rounded hover:bg-totk-green focus:outline-none focus:shadow-outline" 
              type="submit"
            >
              Sign Up
            </button>
            <Link to="/login" className="inline-block text-sm font-bold text-white align-baseline hover:text-totk-green-light">
              Already have an account? Login!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
