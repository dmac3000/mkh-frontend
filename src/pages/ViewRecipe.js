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
    <div className="mx-auto my-auto text-white w-1/4 pt-10">
      <div className="bg-black/70 rounded-2xl relative pb-4">
        <div className="flex flex-col items-center justify-start h-3/4 ">
          <div className="pt-6 mx-auto px-5 py-4 rounded text-white">
            <h1 className="text-4xl font-custom pb-4">View Recipe</h1>
            <RecipeCard recipe={recipe} />
            <div className="mt-4 flex gap-4 justify-center">
              <button 
                className="w-24 px-4 py-2 font-bold text-white bg-totk-green-light rounded hover:bg-totk-green focus:outline-none focus:shadow-outline" 
              >
                Edit
              </button>
              <button 
                className="w-24 px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-800 focus:outline-none focus:shadow-outline" 
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default ViewRecipe;
