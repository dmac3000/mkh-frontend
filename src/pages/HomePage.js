import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CarouselContainer from '../components/CarouselContainer';

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
      <CarouselContainer
      title="Welcome, Traveller!"
      text="It's dangerous to cook alone."
      subtitle="Take these recipes!"
      items={recipes}
    />
);
};

export default ViewAllRecipes;
