import React, { useEffect } from 'react';
import CircleType from 'circletype';
import { ingredientImages } from '../ingredientImages';
import { recipeImages } from '../recipeImages'; 
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  useEffect(() => {
    const recipeNameElement = document.getElementById('recipe-name');
    if (recipeNameElement) {
      const circleType = new CircleType(recipeNameElement);
      circleType.radius(200);
    }
  }, [recipe]);

  // If recipe or recipe.userId is undefined, return a placeholder layout
  if (!recipe || !recipe.userId) {
    return (
      <div className="w-96 h-4/5 rounded-lg shadow-lg overflow-hidden mx-auto relative">
        <p>No recipe to display</p>
      </div>
    );
  }

  console.log('Recipe image:', recipe.imageFilename);

  return (
    <Link to={`/view-recipe/${recipe._id}`}>
    <div className="w-96 h-4/5 rounded-lg shadow-lg overflow-hidden mx-auto relative">
      {/* This is your background image. Change width of recipe card later */}
      <img className="h-96 w-full object-contain" src="/RecipeCard.png" alt="Recipe Card Background" />

      {/* This is the selected recipe image */}
      {recipe.imageFilename && recipeImages[recipe.imageFilename] ? (
        <img className="h-24 w-full object-contain absolute top-16 left-0" src={recipeImages[recipe.imageFilename]} alt="Selected Recipe" />
      ) : recipe.imageFilename ? (
        <p className="absolute top-20 left-0 bg-white">Image not found: {recipe.imageFilename}</p>
      ) : null}

      <div className="p-4 absolute top-2 left-0 bg-opacity-50 w-full">
        <h3 id="recipe-name" className="text-xl font-bold text-center mb-16">{recipe.name}</h3>
      </div>

      {/* Recipe description */}
      <div className="p-2 absolute top-44 bg-opacity-50 w-full text-center">
        <p className="text-xs w-full">{recipe.description}</p>
      </div>

      <div className="p-4 absolute top-40 left-0 bg-opacity-50 w-full">
        <div className="flex justify-center space-x-2 m-12">
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
      <div className="p-2 absolute text-xs bottom-1 bg-opacity-50 w-full text-center">
      <p className="text-xs">Submitted by: {recipe.userId.username}</p>
      </div>
    </div>
    </Link>
  );
};

export default RecipeCard;

