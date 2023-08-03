import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ingredientImages } from '../ingredientImages';
import { recipeImages } from '../recipeImages';

const CreateRecipe = () => {
  const [name, setName] = useState('');
  const [effects, setEffects] = useState('');
  const [description, setDescription] = useState(''); 
  const [image, setImage] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState([
    { id: '', selectedIngredient: null },
    { id: '', selectedIngredient: null },
    { id: '', selectedIngredient: null },
    { id: '', selectedIngredient: null },
    { id: '', selectedIngredient: null },
  ]);

  useEffect(() => {
    axios.get('http://localhost:3333/api/ingredients')
      .then(res => setIngredientsList(res.data))
      .catch(err => console.error(err));
  }, []);

  const [errorMessage, setErrorMessage] = useState(null); 

const handleSubmit = async (e) => {
  e.preventDefault();

  const userId = localStorage.getItem('userId');
  
  // Check if userId is present
  if (!userId) {
    setErrorMessage("You must be logged in to create a recipe."); // <-- Error message if user not logged in
    return; // <-- Prevent the form from being submitted
  }

  try {
    const ingredientNames = ingredients.map(ingredient => ingredient.selectedIngredient.name);
    const requestBody = {
      name,
      effects,
      description,
      ingredients: ingredientNames,
      imageFilename: image,
      userId,
    };
    console.log("Request Body: ", requestBody);
    const { data } = await axios.post('http://localhost:3333/api/recipes', requestBody);
  
    console.log('Recipe created successfully', data);
    setTimeout(() => {
      console.log(`Navigating to /view-recipe/${data._id}`);
      navigate(`/view-recipe/${data._id}`);
    }, 1000);
  } catch (err) {
    console.error(err);
    setErrorMessage("An error occurred while creating the recipe."); // <-- Set an error message if the request fails
  }
};
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    const selected = ingredientsList.find(ingredient => ingredient.name === value);
    newIngredients[index] = { id: selected.name, selectedIngredient: selected };
    setIngredients(newIngredients);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <div className="h-10"></div>
      <div className="max-w-sm mx-auto px-5 py-4 rounded bg-black/70 text-white ">
        <h1 className="text-4xl font-custom pb-4">Create New Recipe</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
  
      <h3 className='text-white font-bold py-2'>Recipe Details</h3>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input type="text" value={effects} onChange={(e) => setEffects(e.target.value)} placeholder="Effects" required />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required /> 

        <h3 className='text-white font-bold py-2'>Select Recipe Image</h3>
        <select onChange={(e) => {
          console.log("Selected image: ", e.target.value);
          setImage(e.target.value);
        }} required>
          <option value="">Select an image</option>
          {/* Replace these options with the actual list of available images */}
          {Object.keys(recipeImages).map((recipeName) => (
            <option value={recipeName} key={recipeName}>{recipeName}</option>
          ))}
        </select>
        
        {image && <img className="recipe-image" src={recipeImages[image]} alt={image} />}
        <h3 className='text-white font-bold py-2'>Select Ingredients</h3>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <select id={`ingredient${index + 1}`} value={ingredient.id} onChange={(e) => handleIngredientChange(index, e.target.value)} required>
              <option value="">Select Ingredient #{index + 1}</option>
              {ingredientsList.map((ingredient) => (
                <option value={ingredient.name} key={ingredient._id}>
                  {ingredient.name}
                </option>
              ))}
            </select>
            {ingredient.selectedIngredient && <img className="ingredient-image" src={ingredientImages[ingredient.selectedIngredient.name]}  alt={ingredient.selectedIngredient.name} />}
          </div>
        ))}
        <button type="submit">Create Recipe</button>
      </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
