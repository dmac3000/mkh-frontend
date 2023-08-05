import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const ViewAllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
  
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/recipes`)
        .then(res => setRecipes(res.data))
        .catch(err => console.error(err));
    }, []);
  
    if (!recipes.length) {
      return null;
    }
  
    return (
      <div className="container mx-auto py-4">
        <h1 className="text-4xl mb-4 text-white">View Recipes</h1>
        <Carousel>
          {recipes.map(recipe => (
            <div key={recipe._id}>
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </Carousel>
      </div>
    );
  };
  
  export default ViewAllRecipes;
  