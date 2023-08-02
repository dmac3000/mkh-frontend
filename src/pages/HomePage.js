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
      
      <div className="container mx-auto px-16 text-white">
        <div className="h-6"></div>
        <div className='bg-black/70 py-6 px-6 rounded-2xl'>
        <h1 className="text-4xl text-white mb-2">Welcome, Traveller!</h1>
        <p className='text-white pl-2'>It's dangerous to cook alone.</p><p className='text-white pl-2 mb-2'> Take these recipes!</p>
        <Carousel>
          {recipes.map(recipe => (
            <div key={recipe._id}>
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </Carousel>
        </div>
      </div>
    );
  };
  
  export default ViewAllRecipes;
  