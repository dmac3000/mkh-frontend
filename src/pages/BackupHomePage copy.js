import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <div className="h-16"></div>
      <div style={{height: "50vh"}} className="w-full bg-black text-white flex flex-col items-center justify-start pt-4">
        <h1 className="text-4xl font-custom pb-20">View All Recipes</h1>
        <Link to="/create-recipe">
        Create Recipe
        </Link>
        <Link to="/view-all">View All</Link>     
           {/*  carousel goes here */}
      </div>
    </div>
  );
};

export default HomePage;