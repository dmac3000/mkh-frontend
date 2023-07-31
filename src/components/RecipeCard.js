import React, { useEffect } from 'react';
import CircleType from 'circletype';
import { ingredientImages } from '../ingredientImages';

const RecipeCard = ({ recipe }) => {
  useEffect(() => {
    const circleType = new CircleType(document.getElementById('recipe-name'));
    circleType.radius(150);
  }, []);

  return (
    <div className="rounded-lg shadow-lg overflow-hidden mx-4">
      <div className="relative">
        <img className="h-96 w-full object-contain" src="/RecipeCard.png" alt="Recipe Card Background" />
        <div className="p-4 absolute top-0 left-0 bg-opacity-50 w-full">
          <h3 id="recipe-name" className="text-xl font-bold text-center mb-16">{recipe.name}</h3>
          <div className="flex justify-center space-x-2 mt-40">
            {recipe.ingredients.map((ingredient, index) => (
              <img 
                key={ingredient._id} 
                className={`h-12 w-12 ${index % 2 === 0 ? 'mt-12' : 'mt-6'}`} 
                src={ingredientImages[ingredient.name]} 
                alt={ingredient.name} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
  
  
};

export default RecipeCard;
