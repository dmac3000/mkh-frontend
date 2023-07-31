import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams
import RecipeCard from '../components/RecipeCard';

const ViewRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams(); // Get the id from the URL

  useEffect(() => {
    axios.get(`http://localhost:3333/api/recipes/${id}`) // Use the id in the request
      .then(res => setRecipe(res.data))
      .catch(err => console.error(err));
  }, [id]); // Pass id as a dependency

  // Don't render anything if the recipe is not loaded yet
  if (!recipe) {
    return null;
  }

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl mb-4 text-white">View Recipe</h1>
      <RecipeCard recipe={recipe} />
    </div>
  );
};

export default ViewRecipe;
