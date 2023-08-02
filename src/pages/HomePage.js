import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const ViewAllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:3333/api/recipes')
        .then(res => setRecipes(res.data))
        .catch(err => console.error(err));
    }, []);
  
    if (!recipes.length) {
      return null;
    }
  
    return (
      <div className="container mx-auto py-6 text-white">
        <h1 className="text-5xl mb-4 ">Welcome, traveller!</h1>
        <p className='text-white'>It's dangerous to cook alone. Take these recipes!</p>
        <Carousel className='pt-8'>
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
  