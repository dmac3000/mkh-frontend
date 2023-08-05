import { ingredientImages } from "../ingredientImages";
import { recipeImages } from "../recipeImages";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  // If recipe or recipe.userId is undefined, return a placeholder layout
  if (!recipe || !recipe.userId) {
    return (
      <div className="w-96 h-4/5 rounded-lg shadow-lg overflow-hidden mx-auto relative">
        <p>No recipe to display</p>
      </div>
    );
  }

  console.log("Recipe image:", recipe.imageFilename);

  return (
    <Link to={`/view-recipe/${recipe._id}`}>
      {/* Container div */}
      <div className="h-4/5 w-72 rounded-lg shadow-lg overflow-hidden mx-auto relative text-recipe-card-brown">
        {/* Recipe Card Background */}
        <img
          className="h-96 w-full object-contain"
          src="/RecipeCard.png"
          alt="Recipe Card Background"
        />

        {/* Selected Recipe Image */}
        {recipe.imageFilename && recipeImages[recipe.imageFilename] ? (
          <img
            className="h-24 w-full object-contain absolute top-16 left-0"
            src={recipeImages[recipe.imageFilename]}
            alt="Selected Recipe"
          />
        ) : recipe.imageFilename ? (
          <p className="absolute top-20 left-0 bg-white">
            Image not found: {recipe.imageFilename}
          </p>
        ) : null}

        {/* Recipe Name */}
        <div className="p-4 absolute top-2 left-0 bg-opacity-50 w-full">
          <h3 id="recipe-name" className=" text-center text-xl font-bold mb-16">
            {recipe.name}
          </h3>
        </div>

        {/* Recipe Description */}
        <div className="absolute pt-1 top-44 italic text-center bg-opacity-50">
          <p className="recipe-description px-4 text-center text-sm">
            {recipe.description}
          </p>
        </div>

        {/* Recipe Ingredients */}
        <div className="p-1 absolute top-56 left-0 bg-opacity-50 w-full">
          <div className="flex justify-center space-x-1">
            {recipe.ingredients.map((ingredient, index) => (
              <img
                key={ingredient._id}
                className={`ingredient-image ${
                  index % 2 === 0 ? "mt-12" : "mt-6"
                }`}
                src={ingredientImages[ingredient.name]}
                alt={ingredient.name}
              />
            ))}
          </div>
        </div>

        {/* Hearts and effects display */}
        <div className="pl-3.5 mb-3 absolute left-10 text-sm text-white bottom-6 bg-opacity-50 flex items-center">
          {/* <div className="absolute text-sm left-24 bottom-[-4] pt-2 flex justify-center items-center"> */}
          <img
            src="/heart.png"
            alt="heart"
            className="heart-image h-3 w-4 pr-1"
          />
          <p className="text-sm pr-12">
            {recipe.hearts === 20 ? "Full" : recipe.hearts}
          </p>
          <p className="text-xs">{recipe.effects}</p>
        </div>

        {/* User ID display */}
        <div className="p-2 absolute text-xs italic bottom-1 bg-opacity-50 w-full text-center">
          <p className="text-xs">Submitted by: {recipe.userId.username}</p>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
