import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ingredientImages } from '../ingredientImages';
import { recipeImages } from '../recipeImages';
import RecipeCard from '../components/RecipeCard';

const CreateRecipe = () => {
  const [name, setName] = useState('');
  const [effects, setEffects] = useState('');
  const [description, setDescription] = useState(''); 
  const [image, setImage] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);
  const navigate = useNavigate();
  const [previewRecipe, setPreviewRecipe] = useState({
    name: '',
    effects: '',
    description: '',
    imageFilename: '',
    ingredients: [],
    userId: {
      _id: localStorage.getItem('userId'),
      username: localStorage.getItem('username') // Assuming 'username' is the key where the username is stored
    }
  });

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
      setErrorMessage("You must be logged in to create a recipe.");
      return;
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
      setErrorMessage("An error occurred while creating the recipe.");
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    const selected = ingredientsList.find(ingredient => ingredient.name === value);
    newIngredients[index] = { id: selected.name, selectedIngredient: selected };
    setIngredients(newIngredients);

    // Update the previewRecipe state
    const newPreviewIngredients = newIngredients.filter(ingredient => ingredient.selectedIngredient !== null).map(ingredient => ingredient.selectedIngredient);
    setPreviewRecipe(prev => ({ ...prev, ingredients: newPreviewIngredients }));
  };

  return (
    <div className="mx-auto my-auto text-white w-1/2 pt-10">
      <div className="bg-black/70 px-2 rounded-2xl relative pb-12">
        <div className="flex flex-row items-start justify-start h-3/4 ">
          <div className="flex flex-col items-center justify-start max-w-sm mx-auto px-5 py-4 rounded text-white">
            <h1 className="text-4xl font-custom pb-4">Create New Recipe</h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
              <h3 className='text-white font-bold py-2'>Recipe Details</h3>
              <input type="text" value={name} onChange={(e) => {
                setName(e.target.value);
                setPreviewRecipe(prev => ({ ...prev, name: e.target.value }));
              }} placeholder="Name" required />

              <input type="text" value={description} onChange={(e) => {
                setDescription(e.target.value);
                setPreviewRecipe(prev => ({ ...prev, description: e.target.value }));
              }} placeholder="Description" required /> 

              <h3 className='text-white font-bold py-2'>Select Recipe Image</h3>
              <select onChange={(e) => {
                setImage(e.target.value);
                setPreviewRecipe(prev => ({ ...prev, imageFilename: e.target.value }));
              }} required>
                <option value="">Select an image</option>
                {Object.keys(recipeImages).map((recipeName) => (
                  <option value={recipeName} key={recipeName}>{recipeName}</option>
                ))}
              </select>

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
                </div>
              ))}
              <button 
              className="px-4 py-2 mt-10 font-bold text-white bg-totk-green-light rounded hover:bg-totk-green focus:outline-none focus:shadow-outline" 
              type="submit"
              >Create Recipe</button>
            </form>
          </div>
          <div className="recipe-preview pt-20 max-w-sm mx-auto px-5 py-4 rounded text-white">
            <RecipeCard recipe={previewRecipe} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateRecipe;