import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CarouselContainer from '../components/CarouselContainer';
import { AuthContext } from '../AuthContext';  // Import AuthContext
import { useNavigate } from 'react-router-dom';  // Import useNavigate

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isLoggedIn } = useContext(AuthContext);  // Get isLoggedIn from AuthContext
  const navigate = useNavigate();  // Get navigate function from useNavigate hook

  useEffect(() => {
    if (!isLoggedIn) {  // If user is not logged in
      navigate('/login', { state: { message: 'You must be logged in to view your recipes' } });  // Navigate to login page
    } else {
      const token = localStorage.getItem('token');
      console.log("Token: ", token);
      axios.get('http://localhost:3333/api/my-recipes', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(res => {
          setRecipes(res.data);
          setLoading(false); // Set loading to false after successfully fetching the recipes
        })
        .catch(err => {
          console.error(err);
          console.error(err.response); // Log the error response
          setError('Failed to load recipes'); 
          setLoading(false);
        });
    }
  }, [isLoggedIn, navigate]);  // Add isLoggedIn and navigate to the dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipes.length) {
    return <div>No recipes found.</div>;
  }

  return (
    <CarouselContainer
    title="My Recipes"
    text="View your previously submitted recipes here."
    subtitle=""
    items={recipes}
  />
  );
}
