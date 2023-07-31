import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <div className="h-16"></div>
      <div style={{height: "50vh"}} className="w-full bg-black text-white flex flex-col items-center justify-start pt-4">
        <h1 className="text-4xl font-custom">View All Recipes</h1>
        <Link to="/create-recipe">
        <h3 className="text-2xl pt-20 font-custom">Create Recipe</h3>
        </Link>
        <Link to="/view-recipe/64c7426d372a998c4aca1ff9">View Recipe</Link>     
           {/*  carousel goes here */}
      </div>
    </div>
  );
};

export default HomePage;