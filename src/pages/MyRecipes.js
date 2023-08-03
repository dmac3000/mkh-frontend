import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarouselContainer from '../components/CarouselContainer';

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token: ", token);  // <-- This should print the token to the console
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
  }, []);
  

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
