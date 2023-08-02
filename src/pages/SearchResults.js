import React from 'react';
import { useLocation } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard'; // adjust the import path as needed
import { Carousel } from 'react-responsive-carousel';

export default function SearchResults() {
    const location = useLocation();
    const results = location.state.results;
    const term = location.state.term; // Access the search term from the state
  
    return (
      <div className="container mx-auto px-16 py-0 text-white">
          <div className="h-10"></div>
          <div className='bg-black/70 py-6 px-6 rounded-2xl'>
          <h1 className="text-4xl mb-4 text-white">Search Results for: {term}</h1> {/* Display the search term here */}
  
          <Carousel className='pt-4'>
        {results.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
        </Carousel>
      </div>
      </div>
    );
  }
  