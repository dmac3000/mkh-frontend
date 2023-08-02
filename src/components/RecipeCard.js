import React, { useEffect } from 'react';
import CircleType from 'circletype';
import { ingredientImages } from '../ingredientImages';
import { recipeImages } from '../recipeImages'; 

const RecipeCard = ({ recipe }) => {
  useEffect(() => {
    const circleType = new CircleType(document.getElementById('recipe-name'));
    circleType.radius(150);
  }, []);

  console.log('Recipe image:', recipe.imageFilename);

  return (
    <div className="rounded-lg shadow-lg overflow-hidden mx-4 relative">
      {/* This is your background image. Change width of recipe card later */}
      <img className="h-96 w-full object-contain" src="/RecipeCard.png" alt="Recipe Card Background" />

      {/* This is the selected recipe image */}
      {recipe.imageFilename && recipeImages[recipe.imageFilename] ? (
        <img className="h-24 w-full object-contain absolute top-16 left-0" src={recipeImages[recipe.imageFilename]} alt="Selected Recipe" />
      ) : (
        <p className="absolute top-20 left-0 bg-white">Image not found: {recipe.imageFilename}</p>
      )}

      <div className="p-4 absolute top-2 left-0 bg-opacity-50 w-full">
        <h3 id="recipe-name" className="text-xl font-bold text-center mb-16">{recipe.name}</h3>
      </div>

      {/* Recipe description */}
      <div className="p-4 absolute top-44 left-0 bg-opacity-50 w-full text-center">
        <p className="text-xl">{recipe.description}</p>
      </div>

      <div className="p-4 absolute top-52 left-0 bg-opacity-50 w-full">
        <div className="flex justify-center space-x-2">
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
  );
};

export default RecipeCard;
