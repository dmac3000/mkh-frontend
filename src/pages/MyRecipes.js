import React from 'react'
import CustomCarousel from '../components/CustomCarousel';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyRecipes() {
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
    <div><h1>MyRecipes</h1>
    <CustomCarousel items={recipes} />
    </div>
  )
}